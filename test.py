import pydot

# Create a new directed graph with vertical layout
graph = pydot.Dot(graph_type='digraph', rankdir='TB', bgcolor="white")  # TB = Top to Bottom

# Define nodes with professional color schemes and labels
user = pydot.Node("User", shape="record", style="filled", fillcolor="#FFC0CB", 
                  label="{User|+nom : string\n+prenom : string\n+email : string\n+numero : string|+addUser()\n+showUser()\n+updateUser()\n+deleteUser()}")
reservation = pydot.Node("Reservation", shape="record", style="filled", fillcolor="#98FB98", 
                         label="{Reservation|+matricule : string\n+dateR : date\n+nom : string\n+numTel : string|+addReservation()\n+showReservation()\n+updateReservation()\n+deleteReservation()}")
event = pydot.Node("Event", shape="record", style="filled", fillcolor="#ADD8E6", 
                   label="{Event|+titre : string\n+description : string\n+date : date\n+datef : date|+addEvent()\n+showEvent()\n+updateEvent()\n+deleteEvent()}")
convention = pydot.Node("Convention", shape="record", style="filled", fillcolor="#FFFFE0", 
                        label="{Convention|+titre : string\n+status : string\n+dateConvention : date\n+pdf : string|+addConvention()\n+showConvention()\n+updateConvention()\n+deleteConvention()}")
slider = pydot.Node("Slider", shape="record", style="filled", fillcolor="#DDA0DD", 
                    label="{Slider|+titre : string\n+description : string\n+image : string|+addSlider()\n+showSlider()\n+updateSlider()\n+deleteSlider()}")
option_reservation = pydot.Node("OptionReservation", shape="record", style="filled", fillcolor="#AFEEEE", 
                                label="{OptionReservation|+idop : int\n+valeur : string}")
option_event = pydot.Node("OptionEvent", shape="record", style="filled", fillcolor="#FFC0CB", 
                          label="{OptionEvent|+idop : int\n+valeur : string}")
role = pydot.Node("Role", shape="record", style="filled", fillcolor="#B0C4DE", 
                  label="{Role|+Admin\n+User}")
event_type = pydot.Node("EventType", shape="record", style="filled", fillcolor="#ccffcc", label="{EventType|+hotel\n+croisiere}")

type_node = pydot.Node("Type", shape="record", style="filled", fillcolor="#FFFFE0", 
                       label="{Type|+partenaires\n+interieur\n+charte}")

# Add nodes to the graph
nodes = [user, reservation, event, convention, slider, option_reservation, option_event, role, event_type, type_node]
for node in nodes:
    graph.add_node(node)

# Define edges with professional UML styles
graph.add_edge(pydot.Edge(user, reservation, label='"1..*"', arrowhead="vee", color="#000000", fontsize="10", fontcolor="#000000"))  # Association
graph.add_edge(pydot.Edge(reservation, event, label='"1..1"', arrowhead="vee", color="#000000", fontsize="10", fontcolor="#000000"))  # Association
graph.add_edge(pydot.Edge(event, event_type, label='"<<Enum>>"', style="dashed", arrowhead="none", color="#000000", fontsize="10", fontcolor="#000000"))  # Dependency
graph.add_edge(pydot.Edge(convention, type_node, label='"<<Enum>>"', style="dashed", arrowhead="none", color="#000000", fontsize="10", fontcolor="#000000"))  # Dependency
graph.add_edge(pydot.Edge(user, role, label='"0..1"', arrowtail="odiamond", color="#000000", fontsize="10", fontcolor="#000000"))  # Aggregation
graph.add_edge(pydot.Edge(event, option_event, label='"0..*"', arrowhead="vee", color="#000000", fontsize="10", fontcolor="#000000"))  # Association
graph.add_edge(pydot.Edge(reservation, option_reservation, label='"0..*"', arrowhead="vee", color="#000000", fontsize="10", fontcolor="#000000"))  # Association
graph.add_edge(pydot.Edge(slider, event, label='"Relates to"', arrowhead="vee", color="#000000", fontsize="10", fontcolor="#000000"))  # Association

# Write the graph to a PNG file
graph.write_png('C:/Users/dhia-/Desktop/professional_diagram.png')
