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
    
    @Column({ type: "int", default: 0 })
    public followers: number;

    @Column({ type: "int", default: 0 })
    public playlists: number;
}

export default User;