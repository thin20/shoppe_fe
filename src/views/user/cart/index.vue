<template>
    <div class="cart">
    <div class="container">
        <div class="cart__content">
            <!-- cart header -->
            <div class="cart-product-header">
                <div class="cart-item__cell-checkbox">
                    <input type="checkbox" class="stardust-checkbox__input input-check-all" :checked="checkedAll" :value="checkedAll" @change="handleCheckAll">
                </div>
                <div class="cart-page-product-header__product">Sản Phẩm</div>
            </div>
            <!-- cart list -->
            <cart-list
              :listBillBySeller="listBillBySeller"
              v-on:changeQuantityProduct="handleChangeQuantityProduct"
              v-on:productChecked="handleProductChecked"
              v-on:cartShopChecked="handleCartShopChecked"
              :key="keyRerender"
            ></cart-list>
            <!-- cart footer -->
            <div class="cart-page-footer">
                <div class="cart-page-footer__row1">
                    <div class="row">
                        <div class="col col-12 col-sm-12 col-md-12 col-lg-7"></div>
                        <div class="col col-12 col-sm-12 col-md-12 col-lg-5">
                            <div class=" cart-page-footer__row1-wrap">
                                <i class="fas fa-tags icon-voucher"></i>
                                <div class="cart-footer__voucher-message">Shopee Voucher</div>
                                <div class="cart-page-footer-space"></div>
                                <div class="cart-footer__voucher-choose">Chọn hoặc nhập mã</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-page-footer__row2">
                    <div class="cart-item__cell-checkbox">
                        <input type="checkbox" class="stardust-checkbox__input input-check-all" :checked="checkedAll" :value="checkedAll" @change="handleCheckAll">
                    </div>
                    <label for="input-check-all" class="cart-page-footer__product-count">Chọn tất cả ({{totalProductChecked}})</label>
                    <button class="cart-item__action btn-delete-mul-product">Xóa</button>
                    <div class="cart-page-footer-space"></div>
                    <div class="cart-page-footer__summary">
                        <div class="cart-page-footer__first-summary">
                            <div class="cart-page-footer-summary__subtotal-text">Tổng tiền hàng ({{totalProductChecked}} Sản phẩm):</div>
                            <div class="cart-page-footer-summary__subtotal-amount">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(totalPrice) }}</div>
                        </div>
                        <div class="cart-page-footer__second-summary">Nhận thêm: 0 Xu</div>
                    </div>
                    <div class="cart-page-footer__checkout">
                        <button type="button" class="btn shopee-button-solid" @click="buyProducts">Mua Hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CartList from '@/views/user/cart/cart_list'
export default {
  name: 'cart',
  components: {
    CartList
  },
  data () {
    return {
      checkedAll: false,
      listBillBySeller: [],
      listChecked: [],
      totalPrice: 0,
      totalProductChecked: 0,
      keyRerender: false
    }
  },
  mounted () {
    this.listBillBySeller = [
      {
        idSeller: 1,
        seller: 'Nguyen Thin',
        bills: [
          {
            product: {
              img: 'https://www.mega-ks.com/wp-content/uploads/2017/09/CANON-EOS-80D-BODY-WITH-EF-S-18-55MM-IS-STM-1.jpg',
              name: 'Máy ảnh Canon EOS 80D 18-55MM 3.5-5.6 IS STM',
              price: 20000000,
              discount: 5
            },
            quantity: 2
          },
          {
            product: {
              img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-white-select-2020?wid=1200&hei=630&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601830932000',
              name: 'Apple iPhone 12 mini 64GB',
              price: 30000000,
              discount: 5
            },
            quantity: 1
          }
        ]
      },
      {
        idSeller: 2,
        seller: 'Dai Nguyen',
        bills: [
          {
            product: {
              img: 'https://i-techbd.com/wp-content/uploads/2019/12/Samsung-Galaxy-S15-.jpg',
              name: 'Samsung Galasy s15',
              price: 15000000,
              discount: 5
            },
            quantity: 3
          },
          {
            product: {
              img: 'https://i.pinimg.com/originals/ba/cb/f9/bacbf92de815da10e178445e15e5b770.jpg',
              name: 'Nhà Sách Online',
              price: 100000,
              discount: 5
            },
            quantity: 4
          }
        ]
      }
    ]
    let newList = [...this.listBillBySeller]
    newList.forEach(item => {
      item.bills.forEach(bill => {
        bill.checked = false
      })
    })
    this.listBillBySeller = newList
    this.calcTotalPrice()
  },
  updated () {
    this.calcTotalPrice()
  },
  methods: {
    handleChangeQuantityProduct ({ idSeller, indexBill, n }) {
      let newList = [...this.listBillBySeller]
      newList.forEach(item => {
        if (item.idSeller === idSeller) {
          item.bills[indexBill].quantity = n
        }
      })
      this.listBillBySeller = newList
      this.calcTotalPrice()
      this.keyRerender = !this.keyRerender
    },
    handleProductChecked ({ idSeller, indexBill }) {
      let newList = [...this.listBillBySeller]
      newList.forEach(item => {
        if (item.idSeller === idSeller) {
          item.bills[indexBill].checked = !item.bills[indexBill].checked
        }
      })
      this.listBillBySeller = newList
      this.checkedAll = this.isCheckAll()
      this.calcTotalPrice()
    },
    handleCartShopChecked ({ idSeller, checkto }) {
      const newList = [...this.listBillBySeller]
      newList.forEach(item => {
        if (item.idSeller === idSeller) {
          item.bills.forEach(bill => {
            bill.checked = checkto
          })
        }
      })
      this.listBillBySeller = newList
      this.checkedAll = this.isCheckAll()
      this.calcTotalPrice()
      this.keyRerender = !this.keyRerender
    },
    handleCheckAll () {
      const newList = [...this.listBillBySeller]
      newList.forEach(item => {
        item.bills.forEach(bill => {
          bill.checked = !this.checkedAll
        })
      })
      this.listBillBySeller = newList
      this.checkedAll = !this.checkedAll
      this.keyRerender = !this.keyRerender
    },
    isCheckAll () {
      let isCheckedAll = true
      this.listBillBySeller.forEach(item => {
        item.bills.forEach(bill => {
          if (bill.checked === false) {
            isCheckedAll = false
            return 0
          }
        })
      })
      return isCheckedAll
    },
    calcTotalPrice () {
      let totalPrice = 0
      let totalProductChecked = 0
      this.listBillBySeller.forEach(item => {
        item.bills.forEach(bill => {
          if (bill.checked) {
            totalPrice += (bill.product.price - Math.floor((bill.product.discount / 100) * bill.product.price)) * bill.quantity
            totalProductChecked += bill.quantity
          }
        })
      })
      this.totalPrice = totalPrice
      this.totalProductChecked = totalProductChecked
    },
    buyProducts () {
      let productsBuy = []
      let newList = [...this.listBillBySeller]
      newList = newList.filter(item => {
        item.bills = item.bills.filter(bill => {
          if (bill.checked) {
            productsBuy = productsBuy.concat(bill.product)
            return false
          }
          return true
        })
        return item.bills.length > 0
      })
      this.listBillBySeller = newList
      console.log('Products bought: ', productsBuy)
      console.log('Product remain in cart: ', this.listBillBySeller)
      this.keyRerender = !this.keyRerender
    }
  }
}
</script>

<style>
.cart {
    background-color: #f5f5f5;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    padding: 15px 0;
}

label {
    padding: 0;
    margin: 0;
}

.cart-item__cell-checkbox {
    padding: 0 20px 0 20px;
}

.stardust-checkbox__input {
    width: 16px;
    height: 16px;
    transform: translateY(2px);
}

.cart-item__action {
    background-color: #fff;
    outline: none;
    border: none;
    font-size: 1.4rem;
}

.cart-item__action:hover {
    color: var(--primary-color);
}

/* Cart page header */
.cart-product-header {
    background-color: #fff;
    align-items: center;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
    overflow: hidden;
    border-radius: 3px;
    padding: 15px;
    font-size: 1.4rem;
    background: #fff;
    text-transform: capitalize;
    margin-bottom: 12px;
    color: #888;
    display: flex;
    align-items: center;
}

/* Cart page footer */
.cart-page-footer {
    background-color: #fff;
    border-radius: 3px;
    position: sticky;
    bottom: 0;
    box-shadow: 0px -10px 15px rgba(0, 0, 0, 0.05);
}

.cart-page-footer__row1-wrap {
    padding: 12px 0;
    display: flex;
    align-items: center;
    margin-left: 12px;
}

.cart-page-footer .icon-voucher {
    font-size: 1.4rem;
}

.cart-footer__voucher-message {
    font-size: 1.5rem;
    margin-left: 12px;
}

.cart-page-footer-space {
    flex: 1;
}

.cart-footer__voucher-choose {
    font-size: 1.4rem;
    margin-right: 16px;
    color: #0384ff;
}

.cart-footer__voucher-choose {
    cursor: pointer;
}

.cart-page-footer__row2 {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-top: 2px dotted rgba(0,0,0,.09);
    flex-wrap: wrap;
}

.cart-page-footer__product-count {
    font-size: 1.5rem;
    padding: 0 12px;
}

.cart-page-footer__first-summary {
    display: flex;
    align-items: center;
}

.cart-page-footer-summary__subtotal-text {
    font-size: 1.5rem;
}

.cart-page-footer-summary__subtotal-amount {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-left: 4px;
}

.cart-page-footer__second-summary {
    font-size: 1.4rem;
    color: #f6af68;
    float: right;
}

.shopee-button-solid {
    background-color: var(--primary-color);
    width: 160px;
    height: 40px;
    color: white;
    margin: 0 16px;
}

.shopee-button-solid:hover {
    opacity: 0.9;
    color: white;
    box-shadow: 0 0 10px #999;
}
</style>
