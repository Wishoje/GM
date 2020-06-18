<template>
  <footer>
    <div class="footer-container">
      <div class="footer-heading">
        <img src="../assets/images/gamersmusiclogo.svg" alt="Gamers Music Logo">
      </div>
      <div class="social-container">
        <p>Follow Us</p>
        <ul class="social-icons">
          <li>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-facebook-square"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-nav">
        <ul class="footer-nav-list">
          <li>
            <a href="#">Faq</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterGM",
  head () {
		return {
			link: [
				{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css' }
			]
		}
  	}
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

li {
  list-style-type: none;
}

footer {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
  min-height: 300px;
}

footer .footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

footer .social-container {
  padding-top: 30px;
}

footer .social-container p {
  padding-bottom: 5px;
}

.social-icons {
  display: flex;
  justify-content: space-between;
  padding: 0 0 20px;
}

.social-icons li i {
  color: #fff;
  font-size: 1.5rem;
}

.footer-nav-list {
  display: flex;
}

.footer-nav-list li a {
  color: #fff;
  margin-right: 10px;
  padding: 0 15px;
  font-size: 12px;
}
</style>