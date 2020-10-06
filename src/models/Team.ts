import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
// @Unique("UQ_SLACK_USER_IN_TEAM", ['slackId', 'region'])
export class Team {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    slackId!: string;

    @Column()
    domain!: string;

    @Column({ nullable: true })
    botUserToken?: string;

    @Column({ nullable: true })
    botUserId?: string;

    @Column({ nullable: true })
    emailDomain?: string;
}

export default Team