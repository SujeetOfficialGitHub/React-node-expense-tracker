import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLeaderboard } from '../../store/features/premiumSlice'
import {Table, Container} from 'react-bootstrap'
import Helmet from '../../component/common/Helmet'

const Leaderboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getLeaderboard())
    },[dispatch])

    const leaderboardList = useSelector(state => state.premium.leaderboardList)
    return (
        <Helmet title="Leaderboard">
            <Container style={{maxWidth: "60rem"}}>
            <h1 className='text-center mt-3 pt-2 pb-2'>Leaderboard</h1>
            {leaderboardList && leaderboardList.length > 0 ? (
            <Table striped className='font-title mt-3'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                {leaderboardList
                    .slice()
                    .sort((a,b) => b.totalAmount - a.totalAmount)
                    .map((leaderboard, index) => (
                        <tr key={leaderboard.id}>
                            <td>{index+1}</td>
                            <td>{leaderboard.name}</td>
                            <td>Rs. {leaderboard.totalAmount}</td>
                        </tr> 
                        ))
                }
                </tbody>
            </Table>
            ) : (
                <h1>Data Not Found</h1>
            )}
            </Container>
        </Helmet>  
  )
}

export default Leaderboard