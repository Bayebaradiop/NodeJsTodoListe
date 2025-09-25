import { actionHistoryService } from "../services/actionHistory.service.js";
export async function getHistory(req, res) {
    try {
        // Expect authenticate middleware to have set req.user
        const authReq = req;
        const userId = authReq.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }
        const histories = await actionHistoryService.findByUser(userId);
        // Each history already contains action and related task/user due to repository include
        res.status(200).json(histories);
    }
    catch (error) {
        console.error("Erreur /history:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
}
export default { getHistory };
//# sourceMappingURL=history.controller.js.map