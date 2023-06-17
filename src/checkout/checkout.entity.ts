import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CheckoutDetails{
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    firstame:string;

    @Column()
    LastName:string; 
}