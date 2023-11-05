import IssueSummary from '@/app/IssueSummary'
import prisma from '@/prisma/client'
import IssueCharts from '@/app/IssueCharts'
import { Flex } from '@radix-ui/themes'

export default async function Home() {
    const open = await prisma.issue.count({
        where: { status: 'OPEN' },
    })
    const inProgress = await prisma.issue.count({
        where: { status: 'IN_PROGRESS' },
    })
    const closed = await prisma.issue.count({
        where: { status: 'CLOSED' },
    })

    return (
        <Flex direction="column" gap="5">
            <IssueSummary open={open} inProgress={inProgress} closed={closed} />
            <IssueCharts open={open} inProgress={inProgress} closed={closed} />
        </Flex>
    )
}
