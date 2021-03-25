import client from 'part:@sanity/base/client'

export function slugifier(input) {
  const query = '*[_id == $id][0]'
  const params = {id: input._ref}
  return client.fetch(query, params).then(doc => {
    return doc.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200);
  });
}
