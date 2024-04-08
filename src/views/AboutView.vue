<template>
  <div class="about-container py-5">
    <div class="container">
      <h1 class="text-center mb-4 text-light">About Us</h1>

      <div class="row mb-4">
        <div class="col-md-12">
          <p class="text-light">
            GrowSmart Finserv is a dynamic and innovative financial services
            firm dedicated to providing exceptional solutions tailored to meet
            the diverse needs of our clients. Established with a commitment to
            excellence, we specialize in offering a comprehensive suite of
            financial products and services, including life insurance, health
            insurance, general insurance, mutual funds, share market
            investments, post fixed deposits, and taxation services.
          </p>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-6">
          <div class="mb-4">
            <h2 class="text-light">Core Values</h2>
            <ul class="list-unstyled text-light">
              <li>
                <strong>Customer-Centricity:</strong> Putting the needs and
                interests of our clients at the forefront of everything we do.
              </li>
              <li>
                <strong>Integrity:</strong> Upholding the highest ethical
                standards and maintaining transparency in all our dealings.
              </li>
              <li>
                <strong>Innovation:</strong> Continuously striving for
                excellence and embracing innovation to deliver cutting-edge
                solutions.
              </li>
              <li>
                <strong>Professionalism:</strong> Demonstrating professionalism,
                expertise, and dedication in every aspect of our services.
              </li>
              <li>
                <strong>Teamwork:</strong> Fostering a collaborative and
                supportive work environment where teamwork and mutual respect
                are valued.
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <h3 class="text-light mb-3">Our Mission</h3>
          <p class="text-light">
            Our mission at GrowSmart Finserv is to empower our clients to
            achieve financial prosperity and security by offering personalized
            and reliable financial solutions. We strive to build long-lasting
            relationships based on trust, transparency, and integrity while
            delivering excellence in all aspects of our services.
          </p>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-light">Services Offered</h2>

        <div class="row row-cols-1 row-cols-md-2 g-4">
          <!-- Insurance Solutions Card -->
          <div class="col">
            <div class="card bg-dark text-light h-100">
              <div class="card-body">
                <h3 class="card-title">Insurance Solutions</h3>
                <ul class="list-unstyled">
                  <li>
                    Life Insurance: Tailored policies to protect your loved ones
                    and secure their financial future.
                  </li>
                  <li>
                    Health Insurance: Comprehensive coverage to safeguard
                    against medical expenses and unforeseen healthcare costs.
                  </li>
                  <li>
                    General Insurance: Protection for your valuable assets and
                    properties against risks such as fire, theft, and natural
                    calamities.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Investment Management Card -->
          <div class="col">
            <div class="card bg-dark text-light h-100">
              <div class="card-body">
                <h3 class="card-title">Investment Management</h3>
                <ul class="list-unstyled">
                  <li>
                    Mutual Funds: Diversified investment options managed by
                    seasoned professionals to help you achieve your financial
                    goals.
                  </li>
                  <li>
                    Share Market Investments: Strategic guidance and expertise
                    to navigate the complexities of the stock market and
                    maximize returns.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Financial Planning Card -->
          <div class="col">
            <div class="card bg-dark text-light h-100">
              <div class="card-body">
                <h3 class="card-title">Financial Planning</h3>
                <ul class="list-unstyled">
                  <li>
                    Post Fixed Deposits: Secure and stable investment avenues
                    with attractive interest rates to grow your wealth
                    systematically.
                  </li>
                  <li>
                    Taxation Services: Expert assistance in tax planning and
                    compliance to optimize your financial resources and minimize
                    tax liabilities.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-light">Contact Information</h2>
        <ul class="list-unstyled contact-list">
          <li>
            <i class="bi bi-geo-alt"></i>
            <span class="contact-label">Address:</span>
            <span>[Insert Address]</span>
          </li>
          <li>
            <i class="bi bi-phone"></i>
            <span class="contact-label">Phone:</span>
            <span>[Insert Phone Number]</span>
          </li>
          <li>
            <i class="bi bi-envelope"></i>
            <span class="contact-label">Email:</span>
            <a
              class="text-light"
              href="mailto:keneythundiwala@gmail.com	
"
              >keneythundiwala@gmail.com</a
            >
          </li>
          <li>
            <i class="bi bi-globe"></i>
            <span class="contact-label">Website:</span>
            <a
              class="text-light"
              href="https://growsmartfinserv.vercel.app"
              target="_blank"
            >
              https://growsmartfinserv.vercel.app
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// You can add script setup variables or functions here if needed
</script>

<style scoped>
.about-container {
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  padding: 60px 0;
}

.container {
  color: #fff;
}
.card {
  border-color: #198754;
}
.img-fluid {
  border-radius: 10px;
}

.text-light {
  color: #f8f9fa !important;
}

.contact-list {
  list-style: none;
  padding-left: 0;
}

.contact-list li {
  margin-bottom: 10px;
}

.contact-list li i {
  margin-right: 10px;
  color: #198754; /* Or your preferred color */
}

.contact-label {
  margin-right: 5px;
  font-weight: bold;
}
</style>
