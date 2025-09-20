import multer from "multer";
import path from "path";
import fs from "fs";
const uploadDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir))
    fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
        cb(null, name);
    },
});
function fileFilter(_req, file, cb) {
    if (file.mimetype.startsWith("image/"))
        cb(null, true);
    else
        cb(new Error("Seulement les images sont autorisées !"));
}
export const upload = multer({ storage, fileFilter });
export default upload;
//# sourceMappingURL=upload.middleware.js.map