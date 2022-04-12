import { prisma } from "../../lib/prisma"

export default async function users(req, res) {
    if (req.method == 'GET') return res.json(await prisma.user.findMany())
    if (req.method == 'POST') {
        const { email, cel, firstName, secondName, familyName, lastName, birthday, assignedAnalyst } = req.body
        if (!email || !cel || !firstName || !secondName || !familyName || !lastName || !birthday || !assignedAnalyst)
            return res.status(400).json({ message: 'bad request' })
        const response = await fetch('https://randommer.io/api/Card', {
            headers: { 'X-api-Key': 'f3b80c8d2c6a478e89445e919e625fff' }
        })
        if (!response.ok) return res.status(400).json({ message: 'bad request' })
        const { type, date, cardNumber, cvv, pin } = await response.json()
        const user = await prisma.user.create({
            data: {
                email,
                cel,
                firstName,
                secondName,
                familyName,
                lastName,
                birthday,
                status: 'PENDIENTE',
                assignedAnalyst,
                cardNumber,
                cardProvider: type,
                cardCvv: cvv,
                cardPin: pin.toString(),
                cardExpDate: date,
            }
        })
        return res.json(user)
    }
    if (req.method == 'PUT') {
        const { id, email, cel, firstName, secondName, familyName, lastName, birthday, assignedAnalyst } = req.body
        if (!id || !email || !cel || !firstName || !secondName || !familyName || !lastName || !birthday || !assignedAnalyst)
            return res.status(400).json({ message: 'bad request' })
        const user = await prisma.user.update({
            data: {
                email, cel, firstName, secondName, familyName, lastName, birthday, assignedAnalyst
            },
            where: {
                id
            }
        })
        return res.json({ message: 'ok', user })
    }
    if (req.method == 'DELETE') {
        const { id } = req.body
        if (!id) return res.status(400).json({ message: 'bad request' })
        await prisma.user.delete({
            where: {
                id
            }
        })
        return res.json({ message: 'ok' })
    }
    return res.status(400).json({ message: 'bad request' })
}