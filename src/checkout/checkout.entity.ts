import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CheckoutDetails extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    firstName: string;

    @Column()
    lastName: string; 

    @Column()
    email: string;

    @Column()
    amount: number;

    @Column()
    narration: string;

    @Column()
    hallOfResidence:string; 

    @Column()
    transactionID: string

    @Column()
    status: string

    @Column()
    date: Date
}