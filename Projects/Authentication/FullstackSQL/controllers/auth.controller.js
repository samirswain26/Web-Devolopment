import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const registerUser = async(req, res) => {
    console.log(`User Registered`)
    await prisma.user.findUnique({
        where: {email}
    })
}