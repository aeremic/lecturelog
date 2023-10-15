/**
 * Builder for constructing JPath query. Please note that calling addRoot method is mandatory before other methods calls.
 * @returns JPath query
 */
export const JPathQueryBuilder = function () {
  return {
    /**
     * Method for adding root operator.
     * @returns
     */
    addRoot: function () {
      this.query = '$';
      return this;
    },
    /**
     * Method for adding child operator.
     * @returns
     */
    addChildOperator: function () {
      this.query += '.';
      return this;
    },
    /**
     * Method for adding element.
     * @param element Element as a string
     * @returns
     */
    addElement: function (element: string) {
      this.query += element;
      return this;
    },
    /**
     * Method used for subscript filter matching.
     * @param key Key for matching
     * @param value Value to be match as a number
     * @returns
     */
    addSubscriptMatching: function (key: string, value: number) {
      this.query += `[?(@.${key}==${value})]`;
      return this;
    },
    /**
     * Method used for subscript filter matching.
     * @param key Key for matching
     * @param value Value to be match as a string
     * @returns
     */
    addSubscriptMatchingWithString: function (key: string, value: string) {
      this.query += `[?(@.${key}=="${value}")]`;
      return this;
    },
  };
};
