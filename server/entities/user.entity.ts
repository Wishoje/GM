import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import UserPosts from '../entities/user_posts.entity';

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

    @Column({ type: "text", default: '' })
    public image: string;

    @Column({ type: "varchar", default: '' })
    public login_type: string;

    @OneToMany(type => UserPosts, posts => posts.user)
    public posts: UserPosts[];
}

export default User;