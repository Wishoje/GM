import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserPosts {
	@PrimaryGeneratedColumn()
    public id: number;
    
	@Column()
    public playlist: string;

}

export default UserPosts;