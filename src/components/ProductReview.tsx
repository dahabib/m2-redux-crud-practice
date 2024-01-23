import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from '@/redux/api/apiSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from './ui/use-toast';

// const dummyComments = [
//   'Bhalo na',
//   'Ki shob ghori egula??',
//   'Eta kono product holo ??',
//   '200 taka dibo, hobe ??',
// ];

export default function ProductReview({ productId }: { productId: string }) {
  const { data: comments } = useGetCommentsQuery(productId);

  const [comment, setComment] = useState('');
  const [addComment, { isLoading, isError, error }] = useAddCommentMutation();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await addComment({ productId, data: { comment } });
      // Reset the comment input after successfully submitting
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  {
    isError && toast({ error });
  }

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <Textarea className="min-h-[30px]" onChange={handleCommentChange} />
        <Button
          className="rounded-full h-10 w-10 p-2 text-[25px]"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          <FiSend />
        </Button>
      </div>
      <div className="mt-10">
        {comments?.map((comment, index) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
