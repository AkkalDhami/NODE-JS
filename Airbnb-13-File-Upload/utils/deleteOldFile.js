import fs from 'fs';

export const deleteOldFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, err => {
            if (err) {
                console.log("Error deleting old image: ", err);
            }
        })
    }
}