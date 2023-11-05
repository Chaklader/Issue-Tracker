import Image from 'next/image'
import Pagination from '@/app/components/Pagination'

export default function Home() {
    return <Pagination itemCount={100} pageSize={10} currentPage={3} />
}
