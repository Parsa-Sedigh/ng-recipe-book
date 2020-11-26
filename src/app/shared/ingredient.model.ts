/* Instead of declaring properties with accessors in body of class and then receive the arguments that we want to assign to
properties of class in constructor, we can use accessors inside the parentheses of constructor and what that do behind
the scenes is it will create the same effect we had before, so it will automatically gives us properties with the names that
we specify in parentheses of constructor as name of arguments(in this case name and amount) and then it will automatically
assign the values we receive in the constructor to those newly created properties. So:
 */

export class Ingredient {
  constructor(public name: string, public amount: number) {
  }
}












