import { getRepository } from "typeorm";
import NotFoundError from "../errors/NotFoundError";

export default abstract class BaseService {
    private entity: any;

    constructor(entity: any) {
        this.entity = entity;
    }

    getEntity(): any {
        return getRepository(this.entity);
    }

    async listAll(): Promise<any[]> {
        const foundData = await this.getEntity().find();
        return foundData;
    }

    async remove(id: number): Promise<void> {
        const dataFound = await this.getEntity().findOne({ id });
        if(!dataFound) throw new NotFoundError("There isn't any entry with the informed id to delete")

        await this.getEntity().delete({ id });
    }
}