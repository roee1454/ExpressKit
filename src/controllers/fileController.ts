import { type Request, type Response } from "express";
import * as p from 'path';
import fs from 'fs';
import { PrismaClient } from "@prisma/client";

//Handle get all file objects from prisma
export async function handleGetAllUploads(req: Request, res: Response) {
    //Logic here... (You can add query params on it!)
    const prisma = new PrismaClient();
    const resultFiles = await prisma.file.findMany();

    if (!resultFiles || resultFiles.length < 1) {
        return res.status(500).send("No Files!")
    }

    await prisma.$disconnect()

    return res.status(200).json(resultFiles);
}

//Handle get a file buffer from local dir
export async function handleGetFile(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        return res.status(500).send("Invalid Path");
    }

    const prisma = new PrismaClient();
    const file = await prisma.file.findUnique({
        where: {
            id
        }
    })
    

    if (!file) {
        return res.status(501).send("Invalid Id!");
    }
 
    const buffer = fs.readFileSync(p.join(__dirname, "../../uploads" ,file.filename));

    if (!buffer) {
        return res.status(500).send("Invalid Path");
    }

    await prisma.$disconnect();

    return res.status(200).sendFile(p.join(__dirname, "../../uploads" ,file.filename));
}

//Handles uploading a file to prisma and local dir
export async function handleUploadFile(req: Request, res: Response) {
    const { file } = req;
    if (!file) {
        return res.status(500).send("Did not recieve a file")
    }
    const prisma = new PrismaClient();
    const resultFile = await prisma.file.create({
        data: {
            filename: file.originalname,
            ContentType: file.mimetype,
            size: file.size,
        }
    })

    await prisma.$disconnect();

    if (!resultFile) {
        return res.status(501).send("Error while uploading file to database..");
    }

    return res.status(200).send(`Uploaded file Sucessfully: ${resultFile.id}`);
}

//Handles updating a file in prisma and local dir..
export async function handleUpdateFile(req: Request, res: Response) {
    const { id } = req.params;
    
    const file = req.file;

    const prisma = new PrismaClient();
    const resultFile = await prisma.file.findUnique({
        where: {
            id
        }
    })

    const requestedFileEnd = resultFile.filename.split(".")[1];
    const fileEnd = file.filename.split(".")[1];
    
    if (fileEnd !== requestedFileEnd) {
        return res.status(502).send("Inidentical file format!");
    }

    //Update process...
    const buffer = fs.readFileSync(p.join(__dirname, "../../uploads", file.filename));
    fs.writeFileSync(p.join(__dirname, "../../uploads", resultFile.filename), buffer);
    fs.rmSync(p.join(__dirname, "../../uploads", file.filename))

    //Database update process..
    await prisma.file.update({
        where: {
            id
        },
        data: {
            size: file.size,
        }
    })

    await prisma.$disconnect();

    return res.status(200).send(`Updated file Sucessfully: ${resultFile.filename}`);
}
//Handles deleting files from prisma and local dir..
export async function handleDeleteFile(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
        return res.status(500).send("Invalid file id");
    }

    const prisma = new PrismaClient();
    const resultFile = await prisma.file.findUnique({
        where: {
            id
        }
    })

    if (!resultFile) {
        return res.status(500).send("Invalid file id");
    }

    fs.rmSync(p.join(__dirname, "../../uploads", resultFile.filename));

    await prisma.file.delete({
        where: {
            id
        }
    })

    prisma.$disconnect();

    return res.status(200).send(`Deleted file successfully: ${resultFile.id}`)
}