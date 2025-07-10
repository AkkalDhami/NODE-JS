import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * fieldsConfig example:
 * {
 *   houseImage: { dest: 'path/to/uploads', mimes: ['image/jpg', 'image/jpeg', 'image/png'] },
 *   rulesPdf:   { dest: 'path/to/rules',   mimes: ['application/pdf'] }
 * }
 */
export function createMultiFieldStorage(fieldsConfig) {
    // Ensure all directories exist
    Object.values(fieldsConfig).forEach(cfg => {
        if (!fs.existsSync(cfg.dest)) {
            fs.mkdirSync(cfg.dest, { recursive: true });
        }
    });

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const cfg = fieldsConfig[file.fieldname];
            if (cfg) {
                cb(null, cfg.dest);
            } else {
                cb(new Error('Unexpected field: ' + file.fieldname));
            }
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        }
    });

    const fileFilter = (req, file, cb) => {
        const cfg = fieldsConfig[file.fieldname];
        if (cfg && (cfg.mimes.length === 0 || cfg.mimes.includes(file.mimetype))) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    return multer({ storage, fileFilter });
}