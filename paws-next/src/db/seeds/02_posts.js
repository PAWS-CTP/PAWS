 /*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  
  await knex('posts').insert([
    {id: 'a3f1c9d2-7b8e-4d4c-9f5f-12b6a7d98f3e', user_id: 1, img_url: "https://cdn.shopify.com/s/files/1/1551/3581/files/Artist_Thumbnail_-__0004_PICASSO_b1073_jacqueline_in_a_straw_hat_lipic1073sc_un1.jpg?v=1659989054",caption: "hi",username:"hiiii",like_count:1, event_id:'f47ac10b-58cc-4372-a567-0e02b2c3d479', pet_id:'9b2e1fa4-3c55-4e22-9c88-4f0e2d7a6b21'},
])};