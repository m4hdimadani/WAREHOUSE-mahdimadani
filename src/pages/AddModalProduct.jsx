import styles from "./AddModalProduct.module.css";
function AddModalProduct({ isModalOpen, setModalOpen }) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3> ایجاد محصول جدید </h3>
        </div>
        <form>
          <p>نام کالا</p>
          <input type="text" placeholder="نام کالا" />
          <p>تعداد موجودی</p>
          <input type="number" placeholder="تعداد" />
          <p>قیمت</p>
          <input type="number" placeholder="قیمت" />
        </form>
        <div className={styles.button}>
          <button>ایجاد</button>
          <button onClick={() => setModalOpen(false)}>
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModalProduct;
