using System;

class Vector
{
	int[] body;
	public Vector(int[] body)
	{
		this.body = body;
	}

	public static Vector operator+(Vector v1, Vector v2)
	{
		int [] newBody = new int[v1.body.Length];
		for(int i = 0; i < newBody.Length; ++i)
		{
			newBody[i] = v1.body[i] + v2.body[i];
		}
		return new Vector(newBody);
	}
}

interface IMovable
{
	Vector Position
	{
		get;
		set;
	}
	Vector Velocity
	{
		get;
	}
}

class MovableAdapter: IMovable
{
	UObject obj;

	public MovableAdapter(UObject obj)
	{
		this.obj = obj;
	}

	public Vector Position
	{
		get
		{
			return (Vector)obj["Position"];
		}
		set
		{
			obj["Position"] = value;
		}
	}
	public Vector Velocity
	{
		get
		{
			return (Vector)obj["Velocity"];
		}
	}
}

interface Command
{
	void execute();
}

class MoveCommand: Command
{
	private IMovable movable;

	public MoveCommand(IMovable movable)
	{
		this.movable = movable;
	}

	public void execute()
	{
		movable.Position += movable.Velocity;
	}
}

UObject obj = ....;

Command[] cmds = new Command[]{
	new CheckFuelCommand(new CheckableFuelAdapter(obj)),
	new MoveCommand(new MovableAdapter(obj)),
	new BurnFuelCommand(new BurnableFuelAdapter(obj)).
    new Log1Command(new Loaggable1Adapter(obj))
};

class MacroCommand: Command
{
	Command[] cmds;

	public MacroCommand(Command[] cmds)
	{
		this.cmds = cmds;
	}

	public void execute()
	{
		foreach(Command cmd in cmds)
		{
			cmd.execute();
		}
	}
}


interface IRotable
{
	int Direction
	{
		get;
		set;
	}
	int AngularVelocity
	{
		get;
	}
	int MaxDirections
	{
		get;
	}
}

class RotableAdapter: IRotable
{
	UObject obj;

	public RotableAdapter(UObject obj)
	{
		this.obj = obj;
	}

	public int Direction
	{
		get
		{
			return (int) obj["Direction"];
		}
		set
		{
			obj["Direction"] = value;
		}
	}
	public int AngularVelocity
	{
		get
		{
			return (int) obj["AngularValocity"];
		}
	}
	public int MaxDirections
	{
		get
		{
			return (int) obj["MaxDirections"];
		}
	}

}

class RotateCommand: Command
{
	private IRotable rotable;

	public RotateCommand(IRotable rotable)
	{
		this.rotable = rotable;
	}

	public void execute()
	{
		rotable.Direction = (rotable.Direction + rotable.AngularVelocity) % rotable.MaxDirections;
	}
}

interface UObject
{
	object this[string key]
	{
		get;
		set;
	}
}
