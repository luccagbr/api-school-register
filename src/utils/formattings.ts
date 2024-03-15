export function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = String(phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]} ${match[3]} - ${match[4]}`;
    }

    return phoneNumber;
}

export function getFileName(path: string) {
    const parts = path.split("/");
    const fileNameWithExtension = parts[parts.length - 1];
    const name = fileNameWithExtension.split(".").slice(0, -1).join(".");
    const extension = path.slice(((path.lastIndexOf(".") - 1) >>> 0) + 2);

    return {
        name,
        extension,
    };
}

export function formatDateOrDateAndTime(date: Date, time?: boolean) {
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();

    if (time) {
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return day + "/" + month + "/" + year + ` ${hours}:${minutes}`;
    }

    return day + "/" + month + "/" + year;
}
