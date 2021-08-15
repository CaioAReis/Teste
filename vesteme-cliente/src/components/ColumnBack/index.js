import { Link } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import './styles.css';

export default function ColumnBack() {
    return(
        <section className="back-container">
            <Link to="/">
                <FiArrowLeftCircle size={50} color="#323935" />
            </Link>
        </section>
    );
}