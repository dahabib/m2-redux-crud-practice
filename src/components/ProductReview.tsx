import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from '@/redux/features/product/productApi';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from './ui/use-toast';

// const dummyComments = [
//   'Bhalo na',
//   'Ki shob ghori egula??',
//   'Eta kono product holo ??',
//   '200 taka dibo, hobe ??',
// ];

export default function ProductReview({ productId }: { productId: string }) {
  const { data, isError, isLoading, error } = useGetCommentsQuery(productId);

  const [comment, setComment] = useState('');
  const [
    addComment,
    { isLoading: postIsLoading, isError: postIsError, error: postError },
  ] = useAddCommentMutation();

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options = { productId, data: { comment } };
    addComment(options);
    setComment('');
  };

  // Display Error Toast
  isError &&
    toast({
      description: `${error}`,
    });

  postIsError &&
    toast({
      description: `${postError}`,
    });

  let content = null;
  if (!isLoading && !isError && data?.comments && data.comments.length === 0) {
    content = <div>No comment found!</div>;
  }

  if (!isLoading && !isError && data?.comments && data?.comments.length > 0) {
    content = data?.comments?.map((comment: string, index: number) => (
      <div key={index} className="flex gap-3 items-center mb-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{comment}</p>
      </div>
    ));
  }

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onClick={handleSubmit}>
        <Textarea className="min-h-[30px]" onChange={handleCommentChange} />
        <Button
          className="rounded-full h-10 w-10 p-2 text-[25px]"
          disabled={postIsLoading}
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">{content}</div>
    </div>
  );
}
