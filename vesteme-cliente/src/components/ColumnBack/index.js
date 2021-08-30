import { useHistory } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import './styles.css';

export default function ColumnBack({back='/'}) {
    const history = useHistory();
    return(
        <section className="back-container">
            <button onClick={() => history.push(back)}>
                <FiArrowLeftCircle size={50}/>
            </button>
        </section>
    );
}