import Container from "@/components/Container"
import { Skeleton } from "@/components/ui/skeleton"

function loading() {

  return (
      <Container>
        <div className='mt-12 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {[0,1,2,3,4,5,6,7,8,9].map(a=>(
              <div key={a.index} className="flex flex-col space-y-3">
                <Skeleton className="max-w-[400px] aspect-square rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
        </div>
    </Container>
  )
}

export default loading