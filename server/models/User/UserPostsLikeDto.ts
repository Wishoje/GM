import { IsNumber } from 'class-validator';

class UserPostsLikeDto {
    @IsNumber()
    public playlistId: number;
}

export default UserPostsLikeDto;