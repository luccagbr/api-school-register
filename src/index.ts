import app from "./app";

const port: number = parseInt(process.env.PORT) || 8080;

const initServer = () => {
    app.listen(port, () => {
        console.log(`Server listener in port ${port}`);
    });
};

initServer();
