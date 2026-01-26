<script setup></script>

<template>
  <div class="p-6">
    <p
      class="text-2xl tracking-wider sm:text-4xl font-mono pb-12 sm:pl-12 transition-all duration-1000 ease-in-out text-[#4A423C]"
    >
      contact us
    </p>
    <p
      class="text-2xl tracking-wider sm:text-sm font-mono pb-12 sm:pl-12 transition-all duration-1000 ease-in-out text-[#85766B]"
    >
      to book a stay with us, please contact us using the form below.
    </p>
    <form
      class="rounded-lg pl-10 space-y-6 max-w-200"
      style="border-color: #85766b"
    >
      <div>
        <label
          for="name"
          class="block text-sm tracking-wider font-mono font-semibold mb-2"
          style="color: #4a423c"
        >
          name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          class="w-1/2 px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
          style="border-color: #c5e5e7"
          onfocus="
            this.style.borderColor = '#C5E5E7';
            this.style.boxShadow = '0 0 0 2px #C5E5E7';
          "
          onblur="
            this.style.borderColor = '#c5e5e7';
            this.style.boxShadow = 'none';
          "
        />
      </div>

      <div>
        <label
          for="email"
          class="block text-sm tracking-wider font-mono font-semibold mb-2"
          style="color: #4a423c"
        >
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          class="w-1/2 px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
          style="border-color: #c5e5e7"
          onfocus="
            this.style.borderColor = '#C5E5E7';
            this.style.boxShadow = '0 0 0 2px #C5E5E7';
          "
          onblur="
            this.style.borderColor = '#c5e5e7';
            this.style.boxShadow = 'none';
          "
        />
      </div>

      <div>
        <label
          class="block tracking-wider font-mono text-sm font-semibold mb-2"
          style="color: #4a423c"
        >
          dates
        </label>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              for="from-date"
              class="block text-xs mb-1 tracking-wider font-mono"
              style="color: #85766b"
            >
              from:
            </label>
            <input
              type="text"
              id="from-date"
              name="from-date"
              placeholder="dd/mm/yyyy"
              pattern="\d{2}/\d{2}/\d{4}"
              required
              class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
              style="border-color: #c5e5e7"
              onfocus="
                this.style.borderColor = '#C5E5E7';
                this.style.boxShadow = '0 0 0 2px #C5E5E7';
              "
              onblur="
                this.style.borderColor = '#c5e5e7';
                this.style.boxShadow = 'none';
              "
            />
          </div>
          <div>
            <label
              for="to-date"
              class="block text-xs mb-1 tracking-wider font-mono"
              style="color: #85766b"
            >
              to:
            </label>
            <input
              type="text"
              id="to-date"
              name="to-date"
              placeholder="dd/mm/yyyy"
              pattern="\d{2}/\d{2}/\d{4}"
              required
              class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono"
              style="border-color: #c5e5e7"
              onfocus="
                this.style.borderColor = '#C5E5E7';
                this.style.boxShadow = '0 0 0 2px #C5E5E7';
              "
              onblur="
                this.style.borderColor = '#c5e5e7';
                this.style.boxShadow = 'none';
              "
            />
          </div>
        </div>
      </div>

      <div>
        <label
          for="message"
          class="block text-sm tracking-wider font-mono font-semibold mb-2"
          style="color: #4a423c"
        >
          message:
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          class="w-full px-4 py-2 border-2 rounded-md focus:outline-none font-mono resize-none"
          style="border-color: #c5e5e7"
          onfocus="
            this.style.borderColor = '#C5E5E7';
            this.style.boxShadow = '0 0 0 2px #C5E5E7';
          "
          onblur="
            this.style.borderColor = '#c5e5e7';
            this.style.boxShadow = 'none';
          "
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
        style="background-color: #c5e5e7"
      >
        Send Message
      </button>
    </form>
  </div>
</template>
