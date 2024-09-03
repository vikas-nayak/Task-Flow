import { checkUser } from '@/lib/checkUser'; // Adjust path as needed

export default async function handler(req, res) {
    try {
        const user = await checkUser();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "lode lag gaye" });
    }
}