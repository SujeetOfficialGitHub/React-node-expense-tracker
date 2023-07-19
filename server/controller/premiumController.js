const User = require('../models/user')
exports.leaderboard = async(req, res) => {
    try{
        const users = await User.findAll();
        const leaderboardData = []
        users.forEach(user => {
            leaderboardData.push({id: user.id, name: user.name, totalAmount: user.totalAmount})
    
        })
        res.status(200).json(leaderboardData)

    }catch(error){
        res.status(404).json({message: 'Faild to fetch leaderboard'})
    }
}