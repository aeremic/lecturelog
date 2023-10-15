export const JPathQueryBuilder = function () {
  return {
    addRoot: function () {
      this.query = '$';
      return this;
    },
    addChildOperator: function () {
      this.query += '.';
      return this;
    },
    addElement: function (element: string) {
      this.query += element;
      return this;
    },
    addSubscriptMatching: function (key: string, value: number) {
      this.query += `[?(@.${key}==${value})]`;
      return this;
    },
    addSubscriptMatchingWithString: function (key: string, value: string) {
      this.query += `[?(@.${key}=="${value}")]`;
      return this;
    },
  };
};
