import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, useDeleteProduct } from "../services/queries";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";

import styles from "./ProductsPage.module.css";
import AddModalProduct from "./AddModalProduct";
import Loading from "./Loading";
import toast from "react-hot-toast";

function ProductsPage() {
  const [isModalOpen, setModalOpen] = useState(null);
  const queryClient = useQueryClient();

  const [text, setText] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const showHandler = () => {
    setModalOpen(true);
  };
  const { mutate } = useDeleteProduct();

  const deleteHandler = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("محصول با مفقیت حذف شد");
        queryClient.invalidateQueries("products");
      },
      onError: (err) => {
        toast.error("خطا ناموغف");
        console.log(err);
      },
    });
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.search}>
          <span>
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="جستجو کالا"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className={styles.manage}>
          <div className={styles.manage_product}>
            <h2>مدیریت کالا</h2>
            <span>
              <VscSettings />
            </span>
          </div>
          <div className={styles.add_product}>
            <button onClick={showHandler}>افزودن محصول</button>
            {!!isModalOpen && (
              <AddModalProduct
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
              />
            )}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th>موجودی </th>
              <th> قیمت</th>
              <th> شناسه کالا</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <Loading />
            ) : (
              data?.data?.data.map((i) => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.quantity}</td>
                  <td>
                    <span className={styles.priceValue}>{i.price}</span>
                    <span className={styles.priceUnit}>هزار تومان</span>
                  </td>
                  <td>{i.id}</td>

                  <td>
                    <span className={styles.edit}>
                      <FaRegEdit />
                    </span>
                    <span
                      className={styles.trash}
                      onClick={() => deleteHandler(i.id)}
                    >
                      <HiOutlineTrash />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductsPage;
