import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
	@PrimaryGeneratedColumn()
    public id: number;
    
	@Column("varchar", { length: 255 })
    public email: string;
    
    @Column()
    public name: string;

	@Column("text")
	public password: string;
}

export default User;