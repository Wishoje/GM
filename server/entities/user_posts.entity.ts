import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserPosts {
	@PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "smallint" })
    public user_id: number;
    
	@Column({ type: "text" })
    public playlist: string;

    @Column({ type: "smallint", default: 0 })
    public likes: number;

    @Column({ type: "smallint", default: 0 })
    public shares: number;

    @Column({ type: "text", default: '' })
    public twitch_link: string;

    @Column({ type: "text", default: '' })
    public mixer: string;

    @Column({ type: "smallint", default: 0 })
    public is_featured: number;
}

export default UserPosts;