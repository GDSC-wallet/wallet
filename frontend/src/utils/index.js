export const rules= {
    required: value => {
      const pattern1 = /^\/\w{7}$/g
      const pattern2 = /^\w{7}$/g
      const pattern3 = /^$/g
      return (pattern1.test(value)||pattern2.test(value)||pattern3.test(value)) || 'Invalid'
    },
};