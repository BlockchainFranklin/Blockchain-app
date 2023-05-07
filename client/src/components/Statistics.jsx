import { BsArrowUpShort } from 'react-icons/bs'
import { groupNumber } from '../constants';
import { StatisticsChart } from '../components'
const Statistics = () => {
    return (
        <div className="containerStatistics theme-container">
            <span className="titleStatistics">Overview Statistics</span>
            <div className="cardsStatistics grey-container">
                <div>
                    <div className="arrowIconStatistics">
                        <BsArrowUpShort />
                    </div>
                    <div className="cardStatistics">
                        <span>Top item this month</span><span>Office comps</span>
                    </div>
                </div>
                <div className="cardStatistics">
                    <span>Items</span><span>$ {groupNumber(455)}</span>
                </div>
                <div className="cardStatistics">
                    <span>Profit</span><span>$ {groupNumber(370000)}</span>
                </div>
                <div className="cardStatistics">
                    <span>Daily Average</span><span>$ {groupNumber(2000)}</span>
                </div>
            </div>
            <StatisticsChart/>
        </div>
    )
}
export default Statistics