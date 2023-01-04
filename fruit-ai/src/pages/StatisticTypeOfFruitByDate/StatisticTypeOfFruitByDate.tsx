import React from 'react'
import './StatisticStyle.scss'

const StatisticTypeOfFruitByDate = () => {
	return (
		<div className='body'>
			<div className='statistic'>
				Biểu đồ 
			</div>
			<div style={{display: 'flex', flexDirection:'column',width:'35%'}}>
				<div className='specified-condition'>Bình thường</div>
				<div className='specified-condition'>Hỏng nhẹ</div>
				<div className='specified-condition'>Hỏng nặng</div>
			</div>
		</div>
	)
}

export default StatisticTypeOfFruitByDate