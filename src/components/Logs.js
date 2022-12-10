import '../assets/style/log.scss';

const Logs = ({logs}) => {
    return (
        <div className='logs'>
            <ul>
                {logs.map((list, idx) => {
                    return <li key={`${list}_${idx}`}>{list}</li>
                })}
            </ul>
        </div>
    )
};
export default Logs;