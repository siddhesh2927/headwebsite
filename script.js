document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".mobile-nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block"

      // Toggle the hamburger icon to an X
      const spans = this.querySelectorAll("span")
      spans.forEach((span) => span.classList.toggle("active"))

      if (spans[0].classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")

  if (testimonialSlides.length > 0) {
    let currentSlide = 0

    function showSlide(index) {
      testimonialSlides.forEach((slide) => slide.classList.remove("active"))
      testimonialDots.forEach((dot) => dot.classList.remove("active"))

      testimonialSlides[index].classList.add("active")
      testimonialDots[index].classList.add("active")
      currentSlide = index
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let newIndex = currentSlide - 1
        if (newIndex < 0) newIndex = testimonialSlides.length - 1
        showSlide(newIndex)
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let newIndex = currentSlide + 1
        if (newIndex >= testimonialSlides.length) newIndex = 0
        showSlide(newIndex)
      })
    }

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })

    // Auto slide every 5 seconds
    setInterval(() => {
      let newIndex = currentSlide + 1
      if (newIndex >= testimonialSlides.length) newIndex = 0
      showSlide(newIndex)
    }, 5000)
  }

  // Product Detail Page - Thumbnail Images
  const thumbnails = document.querySelectorAll(".thumbnail")
  const mainImage = document.getElementById("main-product-image")

  if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        // Update main image
        const imageUrl = this.getAttribute("data-image")
        mainImage.src = imageUrl

        // Update active thumbnail
        thumbnails.forEach((thumb) => thumb.classList.remove("active"))
        this.classList.add("active")
      })
    })
  }

  // Product Detail Page - Quantity Selector
  const quantityInputs = document.querySelectorAll(".quantity-selector input")

  if (quantityInputs.length > 0) {
    quantityInputs.forEach((input) => {
      const minusBtn = input.previousElementSibling
      const plusBtn = input.nextElementSibling

      minusBtn.addEventListener("click", () => {
        const value = Number.parseInt(input.value)
        if (value > Number.parseInt(input.min)) {
          input.value = value - 1
        }
      })

      plusBtn.addEventListener("click", () => {
        const value = Number.parseInt(input.value)
        if (value < Number.parseInt(input.max)) {
          input.value = value + 1
        }
      })
    })
  }

  // Product Detail Page - Color Options
  const colorOptions = document.querySelectorAll(".color-option")

  if (colorOptions.length > 0) {
    colorOptions.forEach((option) => {
      option.addEventListener("click", function () {
        colorOptions.forEach((opt) => opt.classList.remove("active"))
        this.classList.add("active")
      })
    })
  }

  // Product Detail Page - Tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanels = document.querySelectorAll(".tab-panel")

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        // Update active tab button
        tabBtns.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")

        // Update active tab panel
        tabPanels.forEach((panel) => panel.classList.remove("active"))
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Product Detail Page - Review Form Toggle
  const writeReviewBtn = document.getElementById("write-review-btn")
  const reviewForm = document.getElementById("review-form")
  const cancelReviewBtn = document.getElementById("cancel-review")

  if (writeReviewBtn && reviewForm) {
    writeReviewBtn.addEventListener("click", function () {
      reviewForm.style.display = "block"
      this.style.display = "none"
    })

    if (cancelReviewBtn) {
      cancelReviewBtn.addEventListener("click", () => {
        reviewForm.style.display = "none"
        writeReviewBtn.style.display = "block"
      })
    }
  }

  // Product Detail Page - Rating Input
  const ratingStars = document.querySelectorAll(".rating-input i")

  if (ratingStars.length > 0) {
    ratingStars.forEach((star) => {
      star.addEventListener("mouseover", function () {
        const rating = Number.parseInt(this.getAttribute("data-rating"))

        // Update stars on hover
        ratingStars.forEach((s, index) => {
          if (index < rating) {
            s.className = "fas fa-star"
          } else {
            s.className = "far fa-star"
          }
        })
      })

      star.addEventListener("click", function () {
        const rating = Number.parseInt(this.getAttribute("data-rating"))

        // Set the selected rating
        ratingStars.forEach((s, index) => {
          if (index < rating) {
            s.className = "fas fa-star"
          } else {
            s.className = "far fa-star"
          }
        })

        // You can add code here to store the selected rating
      })
    })

    // Reset stars when mouse leaves the rating container
    const ratingContainer = document.querySelector(".rating-input")
    if (ratingContainer) {
      ratingContainer.addEventListener("mouseleave", () => {
        // Find the current selected rating
        const selectedRating = Array.from(ratingStars).filter((s) => s.className === "fas fa-star").length

        // Reset stars based on the selected rating
        ratingStars.forEach((s, index) => {
          if (index < selectedRating) {
            s.className = "fas fa-star"
          } else {
            s.className = "far fa-star"
          }
        })
      })
    }
  }

  // Cart Page - Empty Cart Toggle (for demo purposes)
  const emptyCartEl = document.getElementById("empty-cart")
  const cartWithItemsEl = document.getElementById("cart-with-items")
  const clearCartBtn = document.getElementById("clear-cart")

  if (emptyCartEl && cartWithItemsEl && clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        emptyCartEl.style.display = "block"
        cartWithItemsEl.style.display = "none"

        // Update cart count in header
        const cartCountEl = document.querySelector(".cart-count")
        if (cartCountEl) {
          cartCountEl.textContent = "0"
        }
      }
    })
  }

  // Cart Page - Remove Item
  const removeItemBtns = document.querySelectorAll(".remove-item")

  if (removeItemBtns.length > 0) {
    removeItemBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const cartItem = this.closest(".cart-item")
        if (confirm("Remove this item from your cart?")) {
          cartItem.remove()

          // Update cart count
          const cartItemList = document.getElementById("cart-item-list")
          const remainingItems = cartItemList.querySelectorAll(".cart-item").length

          const cartCountEl = document.querySelector(".cart-count")
          const cartCountTextEl = document.getElementById("cart-count")

          if (cartCountEl) {
            cartCountEl.textContent = remainingItems.toString()
          }

          if (cartCountTextEl) {
            cartCountTextEl.textContent = remainingItems.toString()
          }

          // Show empty cart if no items left
          if (remainingItems === 0 && emptyCartEl && cartWithItemsEl) {
            emptyCartEl.style.display = "block"
            cartWithItemsEl.style.display = "none"
          }

          // Update cart totals (simplified for demo)
          updateCartTotals()
        }
      })
    })
  }

  // Cart Page - Update Totals when quantity changes
  const cartQuantityInputs = document.querySelectorAll(".cart-item-quantity")

  if (cartQuantityInputs.length > 0) {
    cartQuantityInputs.forEach((input) => {
      input.addEventListener("change", () => {
        updateCartTotals()
      })

      const minusBtn = input.previousElementSibling
      const plusBtn = input.nextElementSibling

      if (minusBtn && plusBtn) {
        minusBtn.addEventListener("click", () => {
          setTimeout(updateCartTotals, 10)
        })

        plusBtn.addEventListener("click", () => {
          setTimeout(updateCartTotals, 10)
        })
      }
    })
  }

  // Simple function to update cart totals (for demo purposes)
  function updateCartTotals() {
    // In a real application, you would calculate these values based on the actual items and quantities
    const subtotalEl = document.getElementById("subtotal")
    const taxEl = document.getElementById("tax")
    const discountEl = document.getElementById("discount")
    const totalEl = document.getElementById("total")

    if (subtotalEl && taxEl && discountEl && totalEl) {
      // Get all cart items
      const cartItems = document.querySelectorAll(".cart-item")
      let subtotal = 0

      cartItems.forEach((item) => {
        const priceText = item.querySelector(".current-price").textContent
        const price = Number.parseFloat(priceText.replace("$", ""))
        const quantity = Number.parseInt(item.querySelector(".cart-item-quantity").value)
        subtotal += price * quantity
      })

      const tax = subtotal * 0.08 // 8% tax rate for demo
      const discount = subtotal > 200 ? 60 : 0 // $60 discount for orders over $200
      const total = subtotal + tax - discount

      subtotalEl.textContent = "$" + subtotal.toFixed(2)
      taxEl.textContent = "$" + tax.toFixed(2)
      discountEl.textContent = "-$" + discount.toFixed(2)
      totalEl.textContent = "$" + total.toFixed(2)
    }
  }

  // Contact Page - FAQ Toggles
  const faqToggles = document.querySelectorAll(".faq-toggle")

  if (faqToggles.length > 0) {
    faqToggles.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const faqItem = this.closest(".faq-item")
        const faqAnswer = faqItem.querySelector(".faq-answer")

        // Toggle the answer visibility
        if (faqAnswer.style.display === "block") {
          faqAnswer.style.display = "none"
          this.innerHTML = '<i class="fas fa-plus"></i>'
        } else {
          faqAnswer.style.display = "block"
          this.innerHTML = '<i class="fas fa-minus"></i>'
        }
      })
    })
  }

  // Generate Featured Products Dynamically
  const featuredProductsGrid = document.querySelector(".featured-products .product-grid")

  if (featuredProductsGrid) {
    // Sample product data
    const products = [
      {
        id: 1,
        name: "SoundWave Pro X",
        category: "Over-Ear",
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.7,
        reviewCount: 128,
        image: "ASSETS/headphoneXpremium_300X300.jpg",
        isNew: true,
        isSale: true,
      },
      {
        id: 2,
        name: "SoundWave Air Buds",
        category: "In-Ear",
        price: 149.99,
        originalPrice: null,
        rating: 4.5,
        reviewCount: 96,
        image: "ASSETS/airbud_300X300.png",
        isNew: true,
        isSale: false,
      },
      {
        id: 3,
        name: "SoundWave Gaming Pro",
        category: "Gaming",
        price: 199.99,
        originalPrice: 229.99,
        rating: 4.8,
        reviewCount: 64,
        image: "ASSETS/gamingheadphones1_300X300.png",
        isNew: false,
        isSale: true,
      },
      {
        id: 4,
        name: "SoundWave Studio",
        category: "Over-Ear",
        price: 249.99,
        originalPrice: null,
        rating: 4.6,
        reviewCount: 42,
        image: "ASSETS/STUDIOHEADPHONE_300x300.PNG",
        isNew: false,
        isSale: false,
      },
    ]

    // Generate HTML for each product
    products.forEach((product) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"

      let badgesHTML = ""
      if (product.isNew || product.isSale) {
        badgesHTML = `
          <div class="product-badges">
            ${product.isNew ? '<span class="product-badge badge-new">New</span>' : ""}
            ${product.isSale ? '<span class="product-badge badge-sale">Sale</span>' : ""}
          </div>
        `
      }

      let originalPriceHTML = ""
      if (product.originalPrice) {
        originalPriceHTML = `<span class="original-price">$${product.originalPrice}</span>`
      }

      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          ${badgesHTML}
          <div class="product-actions">
            <button class="action-btn" title="Quick view">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn" title="Add to wishlist">
              <i class="far fa-heart"></i>
            </button>
            <button class="action-btn" title="Compare">
              <i class="fas fa-exchange-alt"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating">
            <div class="stars">
              ${generateStars(product.rating)}
            </div>
            <span class="rating-count">(${product.reviewCount})</span>
          </div>
          <div class="product-price">
            <span class="current-price">$${product.price}</span>
            ${originalPriceHTML}
          </div>
          <button class="btn btn-primary add-to-cart">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      `

      featuredProductsGrid.appendChild(productCard)
    })
  }

  // Generate Products for Shop Page
  const shopProductsGrid = document.getElementById("products-grid")
  const productCountEl = document.getElementById("product-count")

  if (shopProductsGrid) {
    // Sample product data (more products for the shop page)
    const shopProducts = [
      {
        id: 1,
        name: "SoundWave Pro X",
        category: "Over-Ear",
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.7,
        reviewCount: 128,
        image: "ASSETS/headphoneXpremium_300X300.jpg",
        isNew: true,
        isSale: true,
      },
      {
        id: 2,
        name: "SoundWave Air Buds",
        category: "In-Ear",
        price: 149.99,
        originalPrice: null,
        rating: 4.5,
        reviewCount: 96,
        image: "ASSETS/airbud_300X300.png",
        isNew: true,
        isSale: false,
      },
      {
        id: 3,
        name: "SoundWave Gaming Pro",
        category: "Gaming",
        price: 199.99,
        originalPrice: 229.99,
        rating: 4.8,
        reviewCount: 64,
        image: "ASSETS/gamingheadphones1_300X300.png",
        isNew: false,
        isSale: true,
      },
      {
        id: 4,
        name: "SoundWave Studio",
        category: "Over-Ear",
        price: 249.99,
        originalPrice: null,
        rating: 4.6,
        reviewCount: 42,
        image: "ASSETS/STUDIOHEADPHONE_300x300.PNG",
        isNew: false,
        isSale: false,
      },
      {
        id: 5,
        name: "SoundWave Sport",
        category: "In-Ear",
        price: 129.99,
        originalPrice: 149.99,
        rating: 4.4,
        reviewCount: 78,
        image: "ASSETS/INEARHEADPHONES1_300x300.PNG",
        isNew: false,
        isSale: true,
      },
      {
        id: 6,
        name: "SoundWave Classic",
        category: "Over-Ear",
        price: 179.99,
        originalPrice: null,
        rating: 4.3,
        reviewCount: 156,
        image: "ASSETS/HEADPHONECLASSIC_300x300.PNG",
        isNew: false,
        isSale: false,
      },
      {
        id: 7,
        name: "SoundWave Mini",
        category: "In-Ear",
        price: 99.99,
        originalPrice: 119.99,
        rating: 4.2,
        reviewCount: 92,
        image: "ASSETS/MINI_300x300.PNG",
        isNew: false,
        isSale: true,
      },
      {
        id: 8,
        name: "SoundWave Elite",
        category: "Over-Ear",
        price: 349.99,
        originalPrice: null,
        rating: 4.9,
        reviewCount: 36,
        image: "ASSETS/PREMIUMHEADPHONES_300x300.png",
        isNew: true,
        isSale: false,
      },
    ]

    // Update product count
    if (productCountEl) {
      productCountEl.textContent = shopProducts.length.toString()
    }

    // Generate HTML for each product
    shopProducts.forEach((product) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"

      let badgesHTML = ""
      if (product.isNew || product.isSale) {
        badgesHTML = `
          <div class="product-badges">
            ${product.isNew ? '<span class="product-badge badge-new">New</span>' : ""}
            ${product.isSale ? '<span class="product-badge badge-sale">Sale</span>' : ""}
          </div>
        `
      }

      let originalPriceHTML = ""
      if (product.originalPrice) {
        originalPriceHTML = `<span class="original-price">$${product.originalPrice}</span>`
      }

      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          ${badgesHTML}
          <div class="product-actions">
            <button class="action-btn" title="Quick view">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn" title="Add to wishlist">
              <i class="far fa-heart"></i>
            </button>
            <button class="action-btn" title="Compare">
              <i class="fas fa-exchange-alt"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating">
            <div class="stars">
              ${generateStars(product.rating)}
            </div>
            <span class="rating-count">(${product.reviewCount})</span>
          </div>
          <div class="product-price">
            <span class="current-price">$${product.price}</span>
            ${originalPriceHTML}
          </div>
          <button class="btn btn-primary add-to-cart">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      `

      shopProductsGrid.appendChild(productCard)
    })

    // Add event listeners to filter checkboxes
    const filterCheckboxes = document.querySelectorAll(".filter-option input")
    if (filterCheckboxes.length > 0) {
      filterCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          // In a real application, you would filter the products based on the selected filters
          // For this demo, we'll just log the selected filters
          console.log("Filter changed:", this.name, this.value, this.checked)
        })
      })
    }

    // Add event listener to sort dropdown
    const sortSelect = document.getElementById("sort-by")
    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        // In a real application, you would sort the products based on the selected option
        console.log("Sort by:", this.value)
      })
    }

    // Add event listener to clear filters button
    const clearFiltersBtn = document.getElementById("clear-filters")
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        // Clear all checkboxes
        filterCheckboxes.forEach((checkbox) => {
          checkbox.checked = false
        })

        // Reset price inputs
        const minPriceInput = document.getElementById("min-price")
        const maxPriceInput = document.getElementById("max-price")
        if (minPriceInput && maxPriceInput) {
          minPriceInput.value = ""
          maxPriceInput.value = ""
        }

        // In a real application, you would reset the product display
        console.log("Filters cleared")
      })
    }
  }

  // Helper function to generate star ratings
  function generateStars(rating) {
    let starsHTML = ""
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>'
    }

    // Add half star if needed
    if (halfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>'
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star"></i>'
    }

    return starsHTML
  }

  // Add to Cart functionality
  const addToCartBtns = document.querySelectorAll(".add-to-cart, .btn-add-to-cart")

  if (addToCartBtns.length > 0) {
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Get current cart count
        const cartCountEl = document.querySelector(".cart-count")
        if (cartCountEl) {
          const currentCount = Number.parseInt(cartCountEl.textContent)
          cartCountEl.textContent = (currentCount + 1).toString()
        }

        // Show success message
        alert("Product added to cart!")
      })
    })
  }

  // Initialize any sliders or carousels
  initializeSliders()
})

// Function to initialize sliders (product sliders, recently viewed, etc.)
function initializeSliders() {
  // For a real application, you would implement proper slider functionality
  // This is a simplified version for demo purposes

  const sliders = document.querySelectorAll(".product-slider")

  if (sliders.length > 0) {
    sliders.forEach((slider) => {
      // Sample product data for sliders
      const sliderProducts = [
        {
          id: 1,
          name: "SoundWave Pro X",
          category: "Over-Ear",
          price: 299.99,
          originalPrice: 349.99,
          rating: 4.7,
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 2,
          name: "SoundWave Air Buds",
          category: "In-Ear",
          price: 149.99,
          originalPrice: null,
          rating: 4.5,
          image: "/placeholder.svg?height=200&width=200&text=In-Ear",
        },
        {
          id: 3,
          name: "SoundWave Gaming Pro",
          category: "Gaming",
          price: 199.99,
          originalPrice: 229.99,
          rating: 4.8,
          image: "/placeholder.svg?height=200&width=200&text=Gaming",
        },
        {
          id: 4,
          name: "SoundWave Studio",
          category: "Over-Ear",
          price: 249.99,
          originalPrice: null,
          rating: 4.6,
          image: "/placeholder.svg?height=200&width=200&text=Studio",
        },
      ]

      // Create a container for the slider items
      const sliderContainer = document.createElement("div")
      sliderContainer.className = "slider-container"

      // Generate HTML for each product
      sliderProducts.forEach((product) => {
        const productCard = document.createElement("div")
        productCard.className = "product-card slider-item"

        let originalPriceHTML = ""
        if (product.originalPrice) {
          originalPriceHTML = `<span class="original-price">$${product.originalPrice}</span>`
        }

        productCard.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
              <div class="stars">
                ${generateStars(product.rating)}
              </div>
            </div>
            <div class="product-price">
              <span class="current-price">$${product.price}</span>
              ${originalPriceHTML}
            </div>
          </div>
        `

        sliderContainer.appendChild(productCard)
      })

      // Add navigation buttons
      const prevBtn = document.createElement("button")
      prevBtn.className = "slider-prev"
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>'

      const nextBtn = document.createElement("button")
      nextBtn.className = "slider-next"
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>'

      // Add everything to the slider
      slider.appendChild(prevBtn)
      slider.appendChild(sliderContainer)
      slider.appendChild(nextBtn)

      // Add event listeners for navigation
      prevBtn.addEventListener("click", () => {
        sliderContainer.scrollBy({ left: -300, behavior: "smooth" })
      })

      nextBtn.addEventListener("click", () => {
        sliderContainer.scrollBy({ left: 300, behavior: "smooth" })
      })
    })
  }

  // Helper function to generate star ratings
  function generateStars(rating) {
    let starsHTML = ""
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>'
    }

    // Add half star if needed
    if (halfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>'
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star"></i>'
    }

    return starsHTML
  }
}
