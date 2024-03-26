import Container from '@/components/Container';

function SingleRoom({params}) {
    console.log('Params: ',params);
  return (
    <Container>
      <h2 className='text-2xl font-semibold mt-4'>
        Single Room ID: {params.roomID}
      </h2> 
    </Container>
  )
}

export default SingleRoom