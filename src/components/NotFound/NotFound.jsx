import styles from "./NotFound.module.css";
import { notFound } from "../../assets/images";
const NotFound = () => {
  return (
    <section className="constainer">
      <section className="d-flex justify-content-center align-items-center py-5">
        <img src={notFound} alt="not found image" className="img-fluid" />
      </section>
    </section>
  );
};

export default NotFound;
