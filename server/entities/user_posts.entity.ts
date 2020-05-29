import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserPosts {
	@PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "smallint" })
    public user_id: number;
    
	@Column({ type: "text" })
    public playlist: string;

    @Column({ type: "smallint" })
    public game_id: number;

    @Column({ type: "smallint" })
    public music_app_id: number;

    @Column({ type: "text" })
    public genres: string;

    @Column({ type: "smallint" })
    public views: number;

    @Column({ type: "smallint" })
    public shares: number;

    @Column({ type: "smallint" })
    public twitch_link: number;

    @Column({ type: "smallint" })
    public is_featured: number;
}

export default UserPosts;