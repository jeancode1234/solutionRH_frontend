<template>
    <div>
      <div class="relative font-poppins">
        <div class="w-full hidden xl:flex h-32"></div>
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(card, index) in cards"
              :key="index"
              class="w-full shrink-0"
            >
              <div
                class="relative h-[90vh] lg:h-screen overflow-hidden flex items-center justify-center"
              >
                <img
                  :src="card.image"
                  :alt="card.title"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"
                ></div>
                <div
                  class="absolute top-0 w-full xl:w-5/6 mx-auto space-y-4 h-full flex flex-col xl:py-44 justify-center items-center sm:p-6"
                >
                  <p
                    class="text-sm sm:text-lg md:text-xl text-white uppercase text-center font-Merriweather"
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    data-aos-delay="300"
                    data-aos-once="true"
                  >
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                  <h3
                    class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-2 text-white"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="300"
                    data-aos-once="true"
                  >
                    {{ card.title }}
                  </h3>
                  <div class="w-full lg:w-4/6 mx-auto py-4 space-y-6">
                    <p
                      class="text-sm md:text-md text-center text-white"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="300"
                      data-aos-once="true"
                    >
                      {{ card.description }}
                    </p>
                    <div class="flex justify-center">
                      <a
                        href="#"
                        class="px-6 py-5 rounded-full bg-[#073183] hover:bg-[#E02454] hover:border-2 hover:border-[#073183] text-white font-bold text-md"
                        >Prendre Rendez-vous</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute bottom-1/3 w-16 h-16 rounded-full bg-[#073183] bg-opacity-40 hover:bg-opacity-70 flex items-center justify-center -translate-y-1/2 left-4 cursor-pointer"
          @click="prevCard"
        >
          <svg
            class="w-8 h-8 text-white transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </div>
        <div
          class="absolute bottom-1/3 w-16 h-16 rounded-full bg-[#073183] bg-opacity-40 hover:bg-opacity-70 flex items-center justify-center -translate-y-1/2 right-4 cursor-pointer"
          @click="nextCard"
        >
          <svg
            class="w-8 h-8 text-white transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          <div
            v-for="(card, index) in cards"
            :key="index"
            :class="[
              'w-3 h-3 rounded-full cursor-pointer transition-colors',
              index === currentIndex
                ? 'bg-[#073183]'
                : 'bg-gray-300 hover:bg-[#203a6e]',
            ]"
            @click="currentIndex = index"
          ></div>
        </div>
      </div>
      <div class="w-full space-y-4 pt-8 font-poppins font-extrabold">
          <div class="flex items-center justify-center py-2">
              <h1 class="uppercase text-2xl lg:text-3xl text-[#073183]">Nos Entreprises partenaires</h1>
          </div>
        <div class="overflow-hidden  container mx-auto flex items-center justify-center space-x-8">
               <div v-for="(img,index) in imgs" :key="index">
                     <img  :src="img" class="" alt="img_alt">
               </div>
        </div>
      </div>
      <div class="w-full p-4 sm:p-12 md:p-24 font-poppins">
        <div class="grid grid-cols-4 xl:grid-cols-8 grid-flow-row gap-8">
          <div
            class="col-span-4 xl:col-span-3 h-[430px] sm:h-[640px] xl:h-[480px] rounded-t-2xl bg-slate-100 flex relative justify-center overflow-hidden"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="false"
          >
            <img
              src="../assets/img/about-2.png"
              class="w-[100%] h-52 sm:h-[300px] xl:h-64"
              alt="about-png"
            />
            <div
              class="w-full h-[230px] sm:h-[350px] xl:h-[230px] absolute pb-2 bg-blue-950 overflow-hidden rounded-bl-none rounded-br-none rounded-t-full bottom-0"
            >
              <img
                src="../assets/img/about-3.jpg"
                class="w-full h-full"
                alt="about3-png"
              />
            </div>
          </div>
          <div class="col-span-4 xl:col-span-5">
            <div class="w-full space-y-4">
              <div
                class="w-full flex space-x-1 sm:space-x-4 items-center"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
                data-aos-once="false"
              >
                <h1
                  class="text-xl font-bold lg:text-2xl uppercase text-[#073183]"
                >
                  Apropos de nous
                </h1>
                <div class="space-y-2">
                  <div class="w-14 h-[2px] bg-[#073183]"></div>
                  <div class="w-32 h-[2px] bg-red-600"></div>
                </div>
              </div>
              <h2
                class="text-4xl lg:text-[44px] leading-[44px] font-extrabold text-[#073183]"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
                data-aos-once="false"
              >
               nous sommes une agence de consultants en immigration de confiance.
              </h2>
              <div
                class="lg:py-4"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
                data-aos-once="false"
              >
                <p
                  class="text-lg lg:text-xl text-slate-500 font-sans"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  architecto consectetur iusto perferendis blanditiis assumenda
                  dignissimos, commodi fuga culpa earum explicabo libero sint est
                  mollitia saepe! Sequi asperiores rerum nemo!
                </p>
              </div>
              <div
                class="space-x-8 flex items-center"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
                data-aos-once="false"
              >
                <div class="flex space-x-2 items-center">
                  <img
                    src="../assets/icon/map.png"
                    width="50"
                    height="50"
                    alt="map_png"
                  />
                  <p class="text-lg text-gray-800">
                    meilleures ressources <br class="hidden md:flex" />
                    d'immigration
                  </p>
                </div>
                <div class="flex space-x-2 items-center">
                  <img
                    src="../assets/icon/passport.png"
                    width="50"
                    height="50"
                    alt="passport_png"
                  />
                  <p class="text-lg text-gray-800">
                    Retour de visas <br class="hidden lg:flex"> disponibles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="font-poppins w-full p-4 sm:p-12 md:p-24 flex items-center justify-center"
        id="breach"
      >
        <div
          class="grid grid-cols-4 sm:grid-cols-8 xl:grid-cols-12 grid-flow-row gap-14 xl:gap-8 items-center justify-center w-full"
        >
          <div
            class="col-span-4 xl:col-span-3 group relative bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div
              class="absolute w-full h-full p-8 flex flex-col items-center justify-center"
            >
              <img src="../assets/icon/passport.png" alt="" />
              <div
                class="w-full py-4 space-y-2 flex justify-center items-center flex-col"
              >
                <h3
                  class="text-2xl text-gray-700 duration-300 group-hover:text-white"
                >
                   Types de visa
                </h3>
                <p
                  class="text-sm text-gray-700 duration-300 group-hover:text-white"
                >
                  Lorem ipsum dolor sit.
                </p>
              </div>
            </div>
            <div
              class="w-full h-0 duration-500 group-hover:h-full group-hover:bg-[#073183] group-hover:bg-opacity-60"
            ></div>
          </div>
          <div
            class="col-span-4 xl:col-span-3 group relative bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            <div
              class="absolute w-full h-full py-8 flex flex-col items-center justify-center"
            >
              <img src="../assets/icon/peoples.png" alt="" />
              <div
                class="w-full py-4 space-y-2 flex justify-center items-center flex-col"
              >
                <h3
                  class="text-2xl text-gray-700 duration-300 group-hover:text-white"
                >
                  Collaborateurs
                </h3>
                <p
                  class="text-sm text-gray-700 duration-300 group-hover:text-white"
                >
                  Lorem ipsum dolor sit.
                </p>
              </div>
            </div>
            <div
              class="w-full h-0 duration-500 group-hover:h-full group-hover:bg-[#073183] group-hover:bg-opacity-60"
            ></div>
          </div>
          <div
            class="col-span-4 xl:col-span-3 group relative bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <div
              class="absolute w-full h-full py-8 flex flex-col items-center justify-center"
            >
              <img src="../assets/icon/check.png" alt="" />
              <div
                class="w-full py-4 space-y-2 flex justify-center items-center flex-col"
              >
                <h3
                  class="text-2xl text-gray-700 duration-300 group-hover:text-white"
                >
                  Procedure de Visas
                </h3>
                <p
                  class="text-sm text-gray-700 duration-300 group-hover:text-white"
                >
                  Lorem ipsum dolor sit.
                </p>
              </div>
            </div>
            <div
              class="w-full h-0 duration-500 group-hover:h-full group-hover:bg-[#073183] group-hover:bg-opacity-60"
            ></div>
          </div>
          <div
            class="col-span-4 xl:col-span-3 group relative bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="700"
          >
            <div
              class="absolute w-full h-full py-8 flex flex-col items-center justify-center"
            >
              <img src="../assets/icon/handshake.png" alt="" />
              <div
                class="w-full py-4 space-y-2 flex justify-center items-center flex-col"
              >
                <h3
                  class="text-2xl text-gray-700 duration-300 group-hover:text-white"
                >
                  Notes reussites
                </h3>
                <p
                  class="text-sm text-gray-700 duration-300 group-hover:text-white"
                >
                  Lorem ipsum dolor sit.
                </p>
              </div>
            </div>
            <div
              class="w-full h-0 duration-500 group-hover:h-full group-hover:bg-[#073183] group-hover:bg-opacity-60"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="font-poppins w-full px-4 sm:p-12 md:p-24 flex flex-col items-center justify-center"
      >
        <div
          class="w-full md:w-5/6 lg:mx-auto p-3 sm:p-6 flex justify-center relative"
        >
          <h4
            class="text-xl font-bold text-[#073183] uppercase px-6 py-1  z-10 -translate-y-2 bg-white absolute"
            data-aos-once="true"
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
             Catégories de visas
          </h4>
          <div
            class="space-y-2 sm:space-y-3 translate-y-2 w-full flex justify-center items-center flex-col"
          >
            <div class="w-[280px] lg:w-[360px] h-[2px] bg-[#073183]"></div>
            <div class="w-[320px] lg:w-[400px] h-[2px] bg-red-600"></div>
          </div>
        </div>
        <h1
          class="text-4xl lg:text-5xl font-bold text-[#073183] text-center py-4"
          data-aos-once="true"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          Permettre la réussite de votre<br class="hidden md:flex" />
           immigration
        </h1>
        <div class="w-full lg:w-5/6 lg:mx-auto lg:py-5">
          <P
            class="text-center font-normal text-lg lg:text-xl text-gray-600"
            data-aos-once="true"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            deleniti amet at atque sequi quibusdam cumque itaque repudiandae
            temporibus, eius nam mollitia voluptas maxime veniam necessitatibus
            saepe in ab? Repellat!
          </P>
        </div>
        <div
          class="grid grid-cols-4 sm:grid-cols-8 xl:grid-cols-12 grid-flow-row gap-14 xl:gap-8 items-center justify-center py-8 w-full"
        >
          <div
            class="col-span-4 xl:col-span-4 cursor-pointer group relative overflow-hidden bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div
              class="absolute w-full p-4 group-hover:duration-500 z-10 group-hover:h-full bg-transparent flex flex-col justify-between group-hover:bg-[#3d3d3d] group-hover:bg-opacity-60"
            >
              <div class="w-full space-y-4 flex flex-col items-center">
                <h4
                  class="text-transparent group-hover:text-white text-2xl lg:text-3xl  uppercase"
                >
                  Students Visa
                </h4>
                <p
                  class="text-transparent group-hover:text-white text-sm text-center"
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quisquam est perspiciatis ab maxime, eveniet
                </p>
              </div>
              <div class="w-full justify-center flex">
                <a
                  href="#"
                  class="w-3/5 text-center mx-auto py-3 text-transparent group-hover:hover:duration-300 group-hover:hover:bg-blue-800 group-hover:hover:text-white group-hover:bg-white rounded group-hover:text-gray-800"
                  >Explore More</a
                >
              </div>
            </div>
  
            <div class="w-full h-full">
              <img
                src="../assets/img/service-1.jpg"
                class="w-full h-full group-hover:scale-150 group-hover:duration-500"
                alt="services_img"
              />
            </div>
          </div>
          <div
            class="col-span-4 xl:col-span-4 cursor-pointer group relative overflow-hidden bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div
              class="absolute w-full p-4 group-hover:duration-500 z-10 group-hover:h-full bg-transparent flex flex-col justify-between group-hover:bg-[#3d3d3d] group-hover:bg-opacity-60"
            >
              <div class="w-full space-y-4 flex flex-col items-center">
                <h4
                  class="text-transparent group-hover:text-white text-2xl lg:text-3xl  uppercase"
                >
                  Residence Visa
                </h4>
                <p
                  class="text-transparent group-hover:text-white text-sm text-center"
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quisquam est perspiciatis ab maxime, eveniet
                </p>
              </div>
              <div class="w-full justify-center flex">
                <a
                  href="#"
                  class="w-3/5 text-center mx-auto py-3 text-transparent group-hover:hover:duration-300 group-hover:hover:bg-blue-800 group-hover:hover:text-white group-hover:bg-white rounded group-hover:text-gray-800"
                  >Explore More</a
                >
              </div>
            </div>
  
            <div class="w-full h-full">
              <img
                src="../assets/img/service-2.jpg"
                class="w-full h-full group-hover:scale-150 group-hover:duration-500"
                alt="services_img"
              />
            </div>
          </div>
          <div
            class="col-span-4 xl:col-span-4 cursor-pointer group relative overflow-hidden bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div
              class="absolute w-full p-4 group-hover:duration-500 z-10 group-hover:h-full bg-transparent flex flex-col justify-between group-hover:bg-[#3d3d3d] group-hover:bg-opacity-60"
            >
              <div class="w-full space-y-4 flex flex-col items-center">
                <h4
                  class="text-transparent group-hover:text-white text-2xl lg:text-3xl  uppercase"
                >
                  Tourist Visa
                </h4>
                <p
                  class="text-transparent group-hover:text-white text-sm text-center"
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quisquam est perspiciatis ab maxime, eveniet
                </p>
              </div>
              <div class="w-full justify-center flex">
                <a
                  href="#"
                  class="w-3/5 text-center mx-auto py-3 text-transparent group-hover:hover:duration-300 group-hover:hover:bg-blue-800 group-hover:hover:text-white group-hover:bg-white rounded group-hover:text-gray-800"
                  >Explore More</a
                >
              </div>
            </div>
  
            <div class="w-full h-full">
              <img
                src="../assets/img/service-3.jpg"
                class="w-full h-full group-hover:scale-150 group-hover:duration-500"
                alt="services_img"
              />
            </div>
          </div>
          <div
            class="col-span-4 xl:col-span-4 cursor-pointer group relative overflow-hidden bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div
              class="absolute w-full p-4 group-hover:duration-500 z-10 group-hover:h-full bg-transparent flex flex-col justify-between group-hover:bg-[#3d3d3d] group-hover:bg-opacity-60"
            >
              <div class="w-full space-y-4 flex flex-col items-center">
                <h4
                  class="text-transparent group-hover:text-white text-2xl lg:text-3xl uppercase"
                >
                  Job Visa
                </h4>
                <p
                  class="text-transparent group-hover:text-white text-sm text-center"
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quisquam est perspiciatis ab maxime, eveniet
                </p>
              </div>
              <div class="w-full justify-center flex">
                <a
                  href="#"
                  class="w-3/5 text-center mx-auto py-3 text-transparent group-hover:hover:duration-300 group-hover:hover:bg-blue-800 group-hover:hover:text-white group-hover:bg-white rounded group-hover:text-gray-800"
                  >Explore More</a
                >
              </div>
            </div>
  
            <div class="w-full h-full">
              <img
                src="../assets/img/service-1.jpg"
                class="w-full h-full group-hover:scale-150 group-hover:duration-500"
                alt="services_img"
              />
            </div>
          </div>
          <div
            class="col-span-4 xl:col-span-4 cursor-pointer group relative overflow-hidden bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div
              class="absolute w-full p-4 group-hover:duration-500 z-10 group-hover:h-full bg-transparent flex flex-col justify-between group-hover:bg-[#3d3d3d] group-hover:bg-opacity-60"
            >
              <div class="w-full space-y-4 flex flex-col items-center">
                <h4
                  class="text-transparent group-hover:text-white text-2xl lg:text-3xl  uppercase"
                >
                  Business Visa
                </h4>
                <p
                  class="text-transparent group-hover:text-white text-sm text-center"
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quisquam est perspiciatis ab maxime, eveniet
                </p>
              </div>
              <div class="w-full justify-center flex">
                <a
                  href="#"
                  class="w-3/5 text-center mx-auto py-3 text-transparent group-hover:hover:duration-300 group-hover:hover:bg-blue-800 group-hover:hover:text-white group-hover:bg-white rounded group-hover:text-gray-800"
                  >Explore More</a
                >
              </div>
            </div>
  
            <div class="w-full h-full">
              <img
                src="../assets/img/service-2.jpg"
                class="w-full h-full group-hover:scale-150 group-hover:duration-500"
                alt="services_img"
              />
            </div>
          </div>
          <div
            class="col-span-4 xl:col-span-4 cursor-pointer group relative overflow-hidden bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div
              class="absolute w-full p-4 group-hover:duration-500 z-10 group-hover:h-full bg-transparent flex flex-col justify-between group-hover:bg-[#3d3d3d] group-hover:bg-opacity-60"
            >
              <div class="w-full space-y-4 flex flex-col items-center">
                <h4
                  class="text-transparent group-hover:text-white text-2xl lg:text-3xl  uppercase"
                >
                  Diplometic Visa
                </h4>
                <p
                  class="text-transparent group-hover:text-white text-sm text-center"
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Quisquam est perspiciatis ab maxime, eveniet
                </p>
              </div>
              <div class="w-full justify-center flex">
                <a
                  href="#"
                  class="w-3/5 text-center mx-auto py-3 text-transparent group-hover:hover:duration-300 group-hover:hover:bg-blue-800 group-hover:hover:text-white group-hover:bg-white rounded group-hover:text-gray-800"
                  >Explore More</a
                >
              </div>
            </div>
  
            <div class="w-full h-full">
              <img
                src="../assets/img/service-3.jpg"
                class="w-full h-full group-hover:scale-150 group-hover:duration-500"
                alt="services_img"
              />
            </div>
          </div>
        </div>
      </div>
    <!----------------------p-->
      <div
        class=" font-poppins w-full p-4 sm:p-12 md:p-24 flex flex-col items-center justify-center bg-[#f3f4f5]">
        <div
          class="w-full md:w-5/6 lg:mx-auto p-3 sm:p-6 flex justify-center relative"
        >
          <h4
            class="text-xl font-bold text-[#073183] uppercase px-6 py-1 z-10 -translate-y-2 bg-[#f3f4f5] absolute"
            data-aos-once="true"
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
          Pourquoi nous choisir
          </h4>
          <div
            class="space-y-2 sm:space-y-3 w-full translate-y-2 flex justify-center items-center flex-col"
          >
            <div class="w-[280px] lg:w-[360px] h-[2px] bg-[#073183]"></div>
            <div class="w-[320px] lg:w-[400px] h-[2px] bg-red-600"></div>
          </div>
        </div>
        <h1
          class="text-4xl lg:text-5xl font-bold text-[#073183] text-center py-4"
          data-aos-once="true"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
       Offrir les services sur mesure <br class="hidden md:flex" />
          dont notre client a besoin
        </h1>
        <div class="w-full lg:w-5/6 lg:mx-auto lg:py-5">
          <P
            class="text-center font-normal text-lg lg:text-xl text-gray-600"
            data-aos-once="true"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            deleniti amet at atque sequi quibusdam cumque itaque repudiandae
            temporibus, eius nam mollitia voluptas maxime veniam necessitatibus
            saepe in ab? Repellat!
          </P>
        </div>
        <div
          class="grid grid-cols-4 sm:grid-cols-8 xl:grid-cols-12 grid-flow-row gap-14 xl:gap-8 items-center justify-center w-full py-8">
          <div
            class="col-span-4 xl:col-span-3 group relative shadow-2xl shadow-gray-400 bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div
              class="absolute w-full h-full p-4 flex flex-col items-center justify-center"
            >
            <div class="w-32 lg:w-24 h-32 lg:h-24 group-hover:duration-200 bg-gray-100 rounded-xl group-hover:rounded-full group-hover:bg-white flex items-center justify-center">
              <img src="../assets/icon/dollar.png" class="w-16 h-16" alt="" />
            </div>
              
              <div
                class="w-full py-4 space-y-2 flex justify-center items-center flex-col"
              >
                <h3
                  class="text-xl text-[#073183] duration-300"
                >
                Rentable
                </h3>
                <p
                  class="text-sm text-gray-700 text-center duration-300 "
                >
                Dolor, sit amet consectetur adipisicing elit. Soluta inventore cum accusamus,
                </p>
                
              </div>
            </div>
            <div
              class="w-full h-0 duration-500 group-hover:h-full group-hover:bg-[#E5EBEF] group-hover:bg-opacity-60"
            ></div>
          </div>
          <div
            class="col-span-4 xl:col-span-3 group relative shadow-2xl shadow-gray-400 bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            <div
              class="absolute w-full h-full p-4 flex flex-col items-center justify-center"
            >
            <div class="w-32 lg:w-24 h-32 lg:h-24 group-hover:duration-200 bg-gray-100 rounded-xl group-hover:rounded-full group-hover:bg-white flex items-center justify-center">
              <img src="../assets/icon/card.png" class="w-16 h-16" alt="" />
            </div>
              
              <div
                class="w-full py-4 space-y-2 flex justify-center items-center flex-col"
              >
                <h3
                  class="text-xl text-[#073183] duration-300"
                >
                Aide pour les visas
                </h3>
                <p
                  class="text-sm text-gray-700 text-center duration-300 "
                >
                Dolor, sit amet consectetur adipisicing elit. Soluta inventore cum accusamus,
                </p>
                
              </div>
            </div>
            <div
              class="w-full h-0 duration-500 group-hover:h-full group-hover:bg-[#E5EBEF] group-hover:bg-opacity-60"
            ></div>
          </div>
          <div
            class="col-span-4 xl:col-span-3 group relative shadow-2xl shadow-gray-400 bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <div
              class="absolute w-full h-full p-4 flex flex-col items-center justify-center"
            >
            <div class="w-32 lg:w-24 h-32 lg:h-24 group-hover:duration-200 bg-gray-100 rounded-xl group-hover:rounded-full group-hover:bg-white flex items-center justify-center">
              <img src="../assets/icon/passport.png" class="w-16 h-16" alt="" />
            </div>
              
              <div
                class="w-full py-4 space-y-2 flex justify-center items-center flex-col"
              >
                <h3
                  class="text-xl text-[#073183] duration-300"
                >
                Traitement plus rapide
                </h3>
                <p
                  class="text-sm text-gray-700 text-center duration-300 "
                >
                Dolor, sit amet consectetur adipisicing elit. Soluta inventore cum accusamus,
                </p>
                
              </div>
            </div>
            <div
              class="w-full h-0 duration-500 group-hover:h-full group-hover:bg-[#E5EBEF] group-hover:bg-opacity-60"
            ></div>
          </div>
          <div
            class="col-span-4 xl:col-span-3 group relative shadow-2xl shadow-gray-400 bg-white h-80 rounded-lg"
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="700"
          >
          <div
              class="absolute w-full h-full p-4 flex flex-col items-center justify-center"
            >
            <div class="w-32 lg:w-24 h-32 lg:h-24 group-hover:duration-200 bg-gray-100 rounded-xl group-hover:rounded-full group-hover:bg-white flex items-center justify-center">
              <img src="../assets/icon/peoples.png" class="w-16 h-16" alt="" />
            </div>
              
              <div
                class="w-full py-4 space-y-2 flex justify-center items-center flex-col"
              >
                <h3
                  class="text-xl text-[#073183] duration-300"
                >
                Entretiens directs
                </h3>
                <p
                  class="text-sm text-gray-700 text-center duration-300 "
                >
                Dolor, sit amet consectetur adipisicing elit. Soluta inventore cum accusamus,
                </p>
                
              </div>
            </div>
            <div
              class="w-full h-0 duration-500 group-hover:h-full group-hover:bg-[#E5EBEF] group-hover:bg-opacity-60"
            ></div>
          </div>
        </div>
        <div class="w-full flex justify-center ">
          <a href="#" class="px-12 duration-300 text-lg py-4 rounded-full bg-[#073183] hover:bg-black text-white">Voir plus</a>
        </div>
      </div>
       <!-------------------------------h-->
  
       <div
        class="font-poppins w-full p-4 sm:p-12 md:p-24 flex flex-col items-center justify-center bg-[#ffff]">
        <div
          class="w-full md:w-5/6 lg:mx-auto p-3 sm:p-6 flex justify-center relative"
        >
          <h4
            class="text-xl font-bold text-[#073183] uppercase px-6 py-1 z-10 -translate-y-2 bg-[#ffff] absolute"
            data-aos-once="true"
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
          Pays que nous offrons
          </h4>
          <div
            class="space-y-2 sm:space-y-3 w-full translate-y-2 flex justify-center items-center flex-col"
          >
            <div class="w-[280px] lg:w-[360px] h-[2px] bg-[#073183]"></div>
            <div class="w-[320px] lg:w-[400px] h-[2px] bg-red-600"></div>
          </div>
        </div>
        <h1
          class="text-4xl lg:text-5xl font-bold text-[#073183] text-center py-4"
          data-aos-once="true"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
         Services d'immigration et <br class="hidden md:flex" />
        visa  pays suivants
        </h1>
        <div class="w-full lg:w-5/6 lg:mx-auto lg:py-5">
          <P
            class="text-center font-normal text-lg lg:text-xl text-gray-600"
            data-aos-once="true"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            deleniti amet at atque sequi quibusdam cumque itaque repudiandae
            temporibus, eius nam mollitia voluptas maxime veniam necessitatibus
            saepe in ab? Repellat!
          </P>
        </div>
        <div
          class="grid grid-cols-4 sm:grid-cols-8 xl:grid-cols-12 grid-flow-row gap-14 xl:gap-8 items-center justify-center w-full py-12">
          <div
           v-for="item in pays" :key="item.id"
            class="col-span-4 xl:col-span-3 relative flex  justify-center shadow-2xl shadow-gray-400 bg-white "
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
             
              <div class="w-full h-[320px] group rounded-lg overflow-hidden relative">
                <div class="w-full h-0 group-hover:duration-500 absolute group-hover:h-full group-hover:bg-[#073183] group-hover:bg-opacity-60 flex items-center justify-center">
                        <p class="text-lg text-transparent group-hover:text-white uppercase">{{item.name}}</p>
                </div>
                <img :src="path + item.photo"  alt="imag_canada_jpg" class="w-full h-full object-cover object-center" />
              </div>
          </div>
          
        </div>
        <div class="w-full flex justify-center ">
          <a href="#" class="px-12 duration-300 text-lg py-4 rounded-full bg-[#073183] hover:bg-black text-white">More Countries</a>
        </div>
      </div>
      <!----------------------------------------------what customers say-->
       <slideComponent/>
       <div
        class="w-full p-4 sm:p-12 md:p-24 flex flex-col items-center justify-center bg-gray-100">
        <div
          class="w-full md:w-5/6 lg:mx-auto p-3 sm:p-6 flex justify-center relative"
        >
          <h4
            class="text-xl font-bold text-[#073183] uppercase px-6 py-1 z-10 -translate-y-2 bg-gray-100 absolute"
            data-aos-once="true"
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
          CHECK OUR TRAINING
          </h4>
          <div
            class="space-y-2 sm:space-y-3 w-full translate-y-2 flex justify-center items-center flex-col"
          >
            <div class="w-[280px] lg:w-[360px] h-[2px] bg-[#073183]"></div>
            <div class="w-[320px] lg:w-[400px] h-[2px] bg-red-600"></div>
          </div>
        </div>
        <h1
          class="text-4xl lg:text-5xl font-bold text-[#073183] text-center py-4"
          data-aos-once="true"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
        Get the Best Coacing Service <br class="hidden md:flex" />
        Training with Our Travisa
        </h1>
        <div class="w-full lg:w-5/6 lg:mx-auto lg:py-5">
          <P
            class="text-center font-normal  text-lg lg:text-xl text-gray-600"
            data-aos-once="true"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            deleniti amet at atque sequi quibusdam cumque itaque repudiandae
            temporibus, eius nam mollitia voluptas maxime veniam necessitatibus
            saepe in ab? Repellat!
          </P>
        </div>
        <div
          class="grid grid-cols-4 sm:grid-cols-8 xl:grid-cols-12 grid-flow-row gap-14 xl:gap-8 items-center justify-center w-full py-12">
          <div
            class="col-span-4 xl:col-span-3 cursor-pointer relative group flex rounded-xl overflow-hidden h-[360px] justify-center shadow-2xl shadow-gray-400 bg-white "
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
             <div class=" absolute group-hover:z-10 w-full h-full flex items-end pb-8 justify-center bg-black bg-opacity-60 ">
               <p class="text-white font-semibold text-2xl text-center">IELTS <br>Coaching</p>
             </div>
             <div class="w-full h-full overflow-hidden">
              <img src="../assets/img/training-1.jpg" class="w-full ease-in-out group-hover:scale-125 group-hover:duration-500 h-full object-cover object-center" alt="training_services">
             </div>
              <div class="duration-500 p-4 space-y-2 ease-in-out transition-all h-0 w-full group-hover:bg-[#073183] bottom-0 group-hover:h-52 absolute z-20">
                       <h4 class="text-transparent group-hover:text-white text-2xl font-bold">IELTS Coaching</h4>
                       <p class="text-xl text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, veritatis.</p>
                       <div class="py-2">
                           <a href="#" class="text-white text-lg font-semibold hover:text-[#000] inline items-center ">Read More </a>
                       </div>
              </div>
          </div>
          <div
            class="col-span-4 xl:col-span-3 cursor-pointer relative group flex rounded-xl overflow-hidden h-[360px] justify-center shadow-2xl shadow-gray-400 bg-white "
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
             <div class=" absolute group-hover:z-10 w-full h-full flex items-end pb-8 justify-center bg-black bg-opacity-60 ">
               <p class="text-white font-semibold text-2xl text-center">IELTS <br>Coaching</p>
             </div>
             <div class="w-full h-full overflow-hidden">
              <img src="../assets/img/training-2.jpg" class="w-full ease-in-out group-hover:scale-125 group-hover:duration-500 h-full object-cover object-center" alt="training_services">
             </div>
              <div class="duration-500 p-4 space-y-2 ease-in-out transition-all h-0 w-full group-hover:bg-[#073183] bottom-0 group-hover:h-52 absolute z-20">
                       <h4 class="text-transparent group-hover:text-white text-2xl font-bold">IELTS Coaching</h4>
                       <p class="text-xl text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, veritatis.</p>
                       <div class="py-2">
                           <a href="#" class="text-white text-lg font-semibold hover:text-[#000] inline items-center ">Read More </a>
                       </div>
              </div>
          </div>
          <div
            class="col-span-4 xl:col-span-3 cursor-pointer relative group flex rounded-xl overflow-hidden h-[360px] justify-center shadow-2xl shadow-gray-400 bg-white "
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
             <div class=" absolute group-hover:z-10 w-full h-full flex items-end pb-8 justify-center bg-black bg-opacity-60 ">
               <p class="text-white font-semibold text-2xl text-center">IELTS <br>Coaching</p>
             </div>
             <div class="w-full h-full overflow-hidden">
              <img src="../assets/img/training-3.jpg" class="w-full ease-in-out group-hover:scale-125 group-hover:duration-500 h-full object-cover object-center" alt="training_services">
             </div>
              <div class="duration-500 p-4 space-y-2 ease-in-out transition-all h-0 w-full group-hover:bg-[#073183] bottom-0 group-hover:h-52 absolute z-20">
                       <h4 class="text-transparent group-hover:text-white text-2xl font-bold">IELTS Coaching</h4>
                       <p class="text-xl text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, veritatis.</p>
                       <div class="py-2">
                           <a href="#" class="text-white text-lg font-semibold hover:text-[#000] inline items-center ">Read More </a>
                       </div>
              </div>
          </div>
          <div
            class="col-span-4 xl:col-span-3 cursor-pointer relative group flex rounded-xl overflow-hidden h-[360px] justify-center shadow-2xl shadow-gray-400 bg-white "
            data-aos-once="false"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
             <div class=" absolute group-hover:z-10 w-full h-full flex items-end pb-8 justify-center bg-black bg-opacity-60 ">
               <p class="text-white font-semibold text-2xl text-center">IELTS <br>Coaching</p>
             </div>
             <div class="w-full h-full overflow-hidden">
              <img src="../assets/img/training-4.jpg" class="w-full ease-in-out group-hover:scale-125 group-hover:duration-500 h-full object-cover object-center" alt="training_services">
             </div>
              <div class="duration-500 p-4 space-y-2 ease-in-out transition-all h-0 w-full group-hover:bg-[#073183] bottom-0 group-hover:h-52 absolute z-20">
                       <h4 class="text-transparent group-hover:text-white text-2xl font-bold">IELTS Coaching</h4>
                       <p class="text-xl text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, veritatis.</p>
                       <div class="py-2">
                           <a href="#" class="text-white text-lg font-semibold hover:text-[#000] inline items-center ">Read More </a>
                       </div>
              </div>
          </div>
        </div>
        
      </div>
      <FooterComponent/>
    </div>
  </template>
  
  <script>
  import image1 from "../assets/icon/carousel-1.jpg";
  import image2 from "../assets/icon/carousel-2.jpg";
  import image3 from "../assets/icon/carousel-1.jpg";
  //
import img1 from '../assets/icon/trackit.jpg';
import img2 from '../assets/icon/mfl_shop.png';
import img3 from '../assets/icon/mfl_design.png';
import img4 from '../assets/icon/j-bio.png';
import img5 from '../assets/icon/aricam.jpg';
import img6 from '../assets/icon/nyb.jpg';
  // import store from "../router/store";
  import slideComponent from "./slideComponent.vue";
  import FooterComponent from "../components/FooterComponent.vue";
 import store from '@/store';
  export default {
    data() {
      return {
        // isLoading: true,
        pays: {},
        path: 'http://127.0.0.1:8000/country_img/',
        currentIndex: 0,
        intervalId: null,
        // store: store(),
        cards: [
          {
            image: image1,
            title: "l'Immigration Autrement ",
            description:
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam consequatur quas at ut adipisci saepe nulla quo cupiditate omnis voluptatum!",
          },
          {
            image: image2,
            title: "Passer à l'action dès maintenant",
            description:
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam consequatur quas at ut adipisci saepe nulla quo cupiditate omnis voluptatum!",
          },
          {
            image: image2,
            title: "Voyager dans n'importe quel pays que vous voulez",
            description:
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam consequatur quas at ut adipisci saepe nulla quo cupiditate omnis voluptatum!",
          },
          {
            image: image3,
            title: " MFL TRAVEL votre meilleur allié",
            description:
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam consequatur quas at ut adipisci saepe nulla quo cupiditate omnis voluptatum!",
          },
        ],
        imgs:[
            img1,
            img2,
            img3,
            img4,
            img5,
            img6,
        ],
      };
    },
    created(){
      this.axios.get(store.state.BASE_URL + 'allPays').then((response) =>{
          
          this.pays = response.data;
        }).catch( error =>console.log(error));
    },
    mounted() {
       // Simule le chargement des données
     
      this.startAutoSlide();
    },
   beforeUnmount() {
      this.stopAutoSlide();
    },
    components:{
      slideComponent,
      FooterComponent,
      // LoadingComponent
    },
    methods: {
      startAutoSlide() {
        this.intervalId = setInterval(() => {
          this.nextCard();
        }, 5000); // Délai de 5 secondes
      },
      stopAutoSlide() {
        clearInterval(this.intervalId);
      },
     
      prevCard() {
        this.currentIndex =
          (this.currentIndex - 1 + this.cards.length) % this.cards.length;
      },
      nextCard() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
      },
    },
  };
  </script>
  
  <style>
  * {
    
  }
  .card-slide {
    flex: 0 0 100%;
  }
  #breach {
    background-image: linear-gradient(
        rgba(245, 244, 244, 0.6),
        rgba(206, 203, 203, 0.8)
      ),
      url("../assets/img/breadcrumb.png");
    background-position: top;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  </style>