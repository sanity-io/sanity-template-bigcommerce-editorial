const storeHash = process.env.SANITY_STUDIO_BIGCOMMERCE_STORE_HASH

export async function UpdateBigCommerce(props) {
  // PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/catalog/products/{{product_id}}/metafields
  // Accept: application/json
  // Content-Type: application/json
  // X-Auth-Token: {{ACCESS_TOKEN}}
  //grab all fields that start with local
  //to send to BC:


  return ({label: "Update BigCommerce", 
           onHandle: console.log({
              "permission_set": "read",
              "namespace": "location_es",
              "key": "name",
              "value": "doc name",
              "description": "location of the product",
              "resource_type": "product",
              "resource_id": 131
            })
})


}
