import { prisma } from "../../lib/prisma"

export default async function filter(req, res) {
    if (req.method == 'POST') {
        const { value } = req.body
        const filter = await prisma.user.findMany({
            where: {
                OR: [
                    { status: value },
                    { firstName: value },
                    { id: value },
                    { email: value },
                    { assignedAnalyst: value }
                ]
            }
        })
        if (filter) return res.status(200).json(filter)
    }
    return res.status(400).json({ message: 'bad request' })
}